import { frequencyToNote } from "../audio/frequencyToNote";
import { usePitchDetector } from "../hooks/usePitchDetector";

import './Tuner.css'

export function Tuner() {
  const { frequency, error } = usePitchDetector()

  // TODO: Display errors gracefully.
  if (error) {
    return <div className='error-message'>{error}</div>
  }


  if (frequency === null) {
    return (
      <div className='tuner'>
        <div className='top'>
          <div className='outer-frame'>
            <div className='inner-frame'>
              <div className='display'>
                <div className='note'>
                  <span className='note-name'>E</span>
                  <span className='note-index'>0</span>
                </div>
                <div className='note-frequency'>80 Hz</div>
              </div>
            </div>
          </div>
        </div>
        <AccuracyBar cents={-3}/>
      </div>
    )
  }

  const noteInfo = frequencyToNote(frequency)

    return (
      <div className='tuner'>
        <div className='top'>
          <div className='display'>
            <div className='note'>
              {/* TOOD: Separate note index from note name. */}
              <span className='note-name'>{noteInfo.note}</span>
              <span className='note-index'></span>
            </div>
            <div className='note-frequency'>{Math.floor(noteInfo.frequency)} Hz</div>
          </div>
        </div>
        <AccuracyBar cents={noteInfo.cents} />
      </div>
    )
}

// TODO: Pass cents as props.
function AccuracyBar({ cents }: { cents: number}) {
  let lights = []
  const numLights = 7
  for (let i = 0; i < numLights; i++) {
    const active = isActive(cents, i )
    let colour: string
    switch (i) {
      case 0:
      case 6:
        colour = 'red'
        break
      case 1:
      case 5:
        colour = 'orange'
        break
      case 2:
      case 4:
        colour = 'yellow'
        break
      default:
        colour = 'green'
    }

    lights.push(
      <div className='light'>
          <div className={`${colour} ${active ? ' on' : ' off'}`}></div>
        </div>
    )
  }
  return (
    <div className='accuracy-bar'>
      <div className='cents-display'>{cents > 0 && '+'}{cents}</div>
      <div className='accuracy-lights'>
        {lights}
      </div>
    </div>
  )
}

function isActive(cents: number, light: number): boolean {
  // We're using a 7 lights indicator.
  // The light in the center will light up when we are in a
  // +3/-3 range.
  // Otherwise it will be like follows:
  // 0: < -32
  // 1: < -16
  // 2: < -3
  // 3: < 3
  // 4: < 16
  // 5: < 32
  // 6: >=32

  const valueRanges = [ -32, -16, -3, 4, 17, 33, 51 ]

  if (light === 0) {
    return cents < valueRanges[light]
  }

  return cents >= valueRanges[light-1] && cents < valueRanges[light]
}
