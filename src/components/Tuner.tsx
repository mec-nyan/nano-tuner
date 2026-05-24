import { frequencyToNote } from '../audio/frequencyToNote'
import { usePitchDetector } from '../hooks/usePitchDetector'
import AccuracyBar from './AccuracyBar'
import Display from './Display'

import './Tuner.css'

export function Tuner() {
  const { frequency, error } = usePitchDetector()

  // TODO: Display errors gracefully.
  if (error) {
    return <div className='error-message'>{error}</div>
  }

  const noteInfo = frequencyToNote(frequency)

  return (
    <div className='tuner'>
      <div className='top'>
        <Display noteInfo={noteInfo} />
        <AccuracyBar cents={noteInfo ? noteInfo.cents : null} />
      </div>
    </div>
  )
}
