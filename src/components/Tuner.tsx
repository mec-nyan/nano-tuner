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
          <div className='display'>
            <div className='note'>
              <span className='note-name'>E</span>
              <span className='note-index'>0</span>
            </div>
            <div className='note-frequency'>80 Hz</div>
          </div>
        </div>
        <AccuracyBar />
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
        <AccuracyBar />
      </div>
    )
}

// TODO: Pass cents as props.
function AccuracyBar() {
  let bars = []
  const numBars = 11
  for (let i = 0; i < numBars; i++) {
    bars.push(
      <div className='bar'></div>
    )
  }
  return (
    <>
      <div className='cents'>
        +23 cents
      </div>
      <div className='accuracy'>
        {bars}
      </div>
    </>
  )
}
