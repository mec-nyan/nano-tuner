import { useState } from 'react'
import { frequencyToNote } from '../audio/frequencyToNote'
import { usePitchDetector } from '../hooks/usePitchDetector'
import AccuracyBar from './AccuracyBar'
import BasePitchSelector from './BasePitchSelector'
import Display from './Display'

import './Tuner.css'
import { A4_FREQUENCY } from '../audio/audioConstants'

export function Tuner() {
  const [ basePitch, setBasePitch ] = useState(A4_FREQUENCY)
  const { frequency, error } = usePitchDetector()

  // TODO: Display errors gracefully.
  if (error) {
    return <div className='error-message'>{error}</div>
  }

  const noteInfo = frequencyToNote(frequency, basePitch)

  return (
    <div className='tuner'>
      <div className='top'>
        <Display noteInfo={noteInfo} base={basePitch} />
        <AccuracyBar cents={noteInfo ? noteInfo.cents : null} />
      </div>
      {/*
      NOTE: A few components will be added here:
      - One to set the base (A4) frequency,
      - One to select how to display accidentals (all flat, all sharp, etc)
      - One for instrument selection (guitar, ukulele, etc).

      I may need to wrap them in a `container` component to tidy up the layout later.
      */}
      <BasePitchSelector basePitch={basePitch} setBasePitch={setBasePitch} />
    </div>
  )
}
