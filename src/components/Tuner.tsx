import { frequencyToNote } from "../audio/frequencyToNote";
import { usePitchDetector } from "../hooks/usePitchDetector";
import AccuracyBar from "./AccuracyBar";

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
