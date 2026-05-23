import type { NoteInfo } from "../audio/frequencyToNote";

import './Display.css'

export default function Display({ noteInfo }: { noteInfo: NoteInfo | null}) {

  let centsStringPlus = ''
  let centsStringMinus = ''
  // NOTE: If 'cents' === 0 then we have nothing to show.
  if (noteInfo) {
    if (noteInfo.cents > 0) {
      centsStringPlus = `${formatSigned(noteInfo.cents)} cents`
    } else if (noteInfo.cents < 0) {
      centsStringMinus = `${formatSigned(noteInfo.cents)} cents`
    }
  }

  return (
    <div className='outer-frame'>
      <div className='inner-frame'>
        <div className='display'>
          <div className='top-info-bar'>
            <div className='info-flat'>♭</div>
            <div className='info-fork'>A4 = 440Hz</div>
            <div className='info-sharp'>♯</div>
          </div>

          <div className='note'>
            {/*
            <span className='note-name'>{noteInfo ? noteInfo.note : '-'}</span>
            <span className='note-index'>{noteInfo ? noteInfo.octave : '-'}</span>
            */}
            <span className='note-name'>{noteInfo ? noteInfo.note : 'A'}</span>
            <span className='note-accidental'>{noteInfo && noteInfo.accidental}</span>
            <span className='note-index'>{noteInfo ? noteInfo.octave : '2'}</span>
          </div>

          {/*
          <div className='note-frequency'>{noteInfo ? noteInfo.frequency.toFixed(2) : '-'} Hz</div>
          */}
          <div className='note-details'>
            <div className='note-deviation-minus'>{centsStringMinus}</div>
            <div className='note-frequency'>
              {noteInfo ? noteInfo.frequency.toFixed(2) : '110.00'} Hz
            </div>
            <div className='note-deviation-plus'>{centsStringPlus}</div>
          </div>
        </div>
      </div>
    </div>
  )
}


function formatSigned(n: number): string {
  // Positive numbers will show "+n"
  // Negative numbers will show "-n"
  // Zero will just be "0".
  const nFixed = n.toFixed(1)
  return n > 0 ? `+${nFixed}` : `${nFixed}`
}
