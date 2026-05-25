import { frequencyToNote } from '../audio/frequencyToNote'
import { usePitchDetector } from '../hooks/usePitchDetector'
import AccuracyBar from './AccuracyBar'
import BasePitchSelector from './BasePitchSelector'
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
      {/*
      NOTE: A few components will be added here:
      - One to set the base (A4) frequency,
      - One to select how to display accidentals (all flat, all sharp, etc)
      - One for instrument selection (guitar, ukulele, etc).

      I may need to wrap them in a `container` component to tidy up the layout later.
      */}
      <BasePitchSelector />
    </div>
  )
}
