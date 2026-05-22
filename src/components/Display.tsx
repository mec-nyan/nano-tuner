import type { NoteInfo } from "../audio/frequencyToNote";

export default function Display({ noteInfo }: { noteInfo: NoteInfo | null}) {
  return (
    <div className='outer-frame'>
      <div className='inner-frame'>
        <div className='display'>
          <div className='note'>
            <span className='note-name'>{noteInfo ? noteInfo.note : '-'}</span>
            <span className='note-index'>{noteInfo ? noteInfo.octave : '-'}</span>
          </div>
          <div className='note-frequency'>{noteInfo ? noteInfo.frequency.toFixed(2) : '-'} Hz</div>
        </div>
      </div>
    </div>
  )
}
