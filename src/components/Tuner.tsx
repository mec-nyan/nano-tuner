import { useState } from 'react'
import { frequencyToNote } from '../audio/frequencyToNote'
import { usePitchDetector } from '../hooks/usePitchDetector'
import AccuracyBar from './AccuracyBar'
import BasePitchSelector from './BasePitchSelector'
import Display from './Display'

import './Tuner.css'
import { A4_FREQUENCY } from '../audio/audioConstants'
import FlatSharpSelector from './FlatSharpSelector'

import type { accidental } from '../audio/audioConstants'
import ErrorMessage from './ErrorMessage'

export function Tuner() {
  const [basePitch, setBasePitch] = useState(A4_FREQUENCY)
  const [acc, setAcc] = useState<accidental>('flat')
  const { frequency, error } = usePitchDetector()

  // For testing/development:
  // if (frequency === null && process.env.NODE_ENV === 'development') {
  //   frequency = 277.0
  // }

  const noteInfo = frequencyToNote(frequency, basePitch, acc)

  return (
    <div className='tuner'>
      <div className='top'>
        {error && <ErrorMessage error={error} />}
        <Display noteInfo={noteInfo} base={basePitch} error={error} />
        <AccuracyBar cents={noteInfo ? noteInfo.cents : null} />
      </div>

      {/*
      NOTE: A few components will be added here:
      - One to set the base (A4) frequency,
      - One to select how to display accidentals (all flat, all sharp, etc)
      - One for instrument selection (guitar, ukulele, etc).

      I may need to wrap them in a `container` component to tidy up the layout later.

      The following may be extracted to a "Controls" component.
      */}

      <div className='center'>
        <div className='controls'>
          <BasePitchSelector
            basePitch={basePitch}
            setBasePitch={setBasePitch}
          />
          <FlatSharpSelector acc={acc} setAcc={setAcc} />
        </div>
      </div>

      <div className='bottom'>
        {/* This will hold the Instrument (optional) component. */}
      </div>
    </div>
  )
}
