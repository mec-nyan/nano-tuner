import { A4_FREQUENCY, A4_MIDI, ALLOWED_DEVIATION, NOTES } from "./audioConstants";

export interface NoteInfo {
  note: string
  frequency: number
  cents: number
  isInTune: boolean
}

export function frequencyToNote(frequency: number): NoteInfo {
  console.log(`Freq: ${frequency}`)
  // Find MIDI note number:
  const midiNote =  A4_MIDI + (12 * Math.log2(frequency / A4_FREQUENCY))
  const closestMidiNote = Math.round(midiNote)

  // Find octave.
  const octave = Math.floor((closestMidiNote - 12) / 12)
  const noteIndex = ((closestMidiNote - 12) % 12 + 12) % 12
  const noteName = NOTES[noteIndex]

  // How many cents sharp/flat is the note?
  const expectedFrequency = A4_FREQUENCY * Math.pow(2, (closestMidiNote - 69) / 12)
  const cents = Math.round(1200 * Math.log2(frequency / expectedFrequency))

  return {
    note: `${noteName}${octave}`,
    frequency,
    cents,
    isInTune: Math.abs(cents) <= ALLOWED_DEVIATION,
  }
}
