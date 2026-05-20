import { frequencyToNote } from "../audio/frequencyToNote";
import { usePitchDetector } from "../hooks/usePitchDetector";

export function Tuner() {
  const { frequency, error } = usePitchDetector()

  if (error) {
    return <div className='error-message'>{error}</div>
  }

  if (frequency === null) {
    return (
      <div className='note-info'>
        <div className='note'>note: ...</div>
        <div className='cents'>accuracy: ...</div>
        <div className='frequency'>frequency: ...</div>
      </div>
    )
  }

  const noteInfo = frequencyToNote(frequency)

  return (
    <div className='note-info'>
      <div className='note'>note: {noteInfo.note}</div>
      <div className='cents'>accuracy: {noteInfo.cents > 0 && '+'}{noteInfo.cents} cents</div>
      <div className='frequency'>frequency: {Math.floor(noteInfo.frequency)}</div>
      {
      noteInfo.isInTune &&
      <div className='in-tune'>Ferpect!</div>
      }
    </div>
  )
}
