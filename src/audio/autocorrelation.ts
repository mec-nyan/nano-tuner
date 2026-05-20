export function autoCorrelate(
  buffer: Float32Array,
  sampleRate: number
): number | null {

  // Computer RMS to detect silence.
  let rms = 0

  for (let i = 0 ;i < buffer.length; i++) {
    rms += buffer[i] * buffer[i]
  }

  rms = Math.sqrt(rms / buffer.length)

  console.log(`RMS: ${rms}`)

  // Too quiet.
  // TODO: Review this limit!
  if (rms < 0.1) {
    return null
  }

  let bestCorrelation = 0
  let bestLag = -1

  const minLag = Math.floor(sampleRate / 1000)
  const maxLag = Math.floor(sampleRate / 50)

  for (let lag = minLag; lag <= maxLag ;lag++) {
    let correlation = 0

    for (let i = 0; i < buffer.length - lag ;i++) {
      correlation += buffer[i] * buffer[i + lag]
    }

    correlation /= buffer.length

    if (correlation > bestCorrelation) {
      bestCorrelation = correlation
      bestLag = lag
    }
  }

  if (bestLag === -1) {
    return null
  }

  return sampleRate / bestLag
}
