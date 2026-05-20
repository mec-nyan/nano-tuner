import { useEffect, useRef, useState } from "react";
import { autoCorrelate } from "../audio/autocorrelation";
import { createSmoother } from "../audio/smoothing";

export function usePitchDetector() {
  const [ frequency, setFrequency ] = useState<number | null>(null)
  const [ error, setError ] = useState<string | null>(null)
  const smoothRef = useRef(createSmoother(5))

  useEffect(() => {
    let animationId: number
    let stream: MediaStream | null = null
    let audioContext: AudioContext | null = null
    let lastUpdate = 0

    const UPDATE_INTERVAL = 1000 / 5

    async function setup() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        })

        audioContext = new AudioContext()
        await audioContext.resume()

        const analyser = audioContext.createAnalyser()

        analyser.fftSize = 2048

        const source = audioContext.createMediaStreamSource(stream)
        source.connect(analyser)

        const buffer = new Float32Array(analyser.fftSize)

        function update() {
          if (!audioContext) {
            return
          }

          const now = performance.now()

          if (now - lastUpdate > UPDATE_INTERVAL) {

            analyser.getFloatTimeDomainData(buffer)

            const detectedFrequency = autoCorrelate(
              buffer,
              audioContext.sampleRate,
            )

            console.log(`Detected: ${detectedFrequency}`)

            const smoothed = smoothRef.current(detectedFrequency)

            setFrequency(smoothed)

            lastUpdate = now
          }


          animationId = requestAnimationFrame(update)
        }

        update()
      } catch (err: any) {
        setError(`Coudn't access microphone: ${err.message}`)
      }
    }

    setup()

    return () => {
      cancelAnimationFrame(animationId)

      if (stream) {
        stream
          .getTracks()
          .forEach(track => track.stop())
      }

      if (audioContext) {
        audioContext.close()
      }
    }
  }, [])

  return { frequency, error }
}
