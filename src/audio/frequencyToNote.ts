import {
  A4_FREQUENCY,
  A4_MIDI,
  ALLOWED_DEVIATION,
  NOTES,
} from './audioConstants'

import { accidentalToString } from './audioConstants'

export interface NoteInfo {
  note: string
  accidental: string
  octave: number
  frequency: number
  cents: number
  isInTune: boolean
}

// TODO: Check this whole logic...
export function frequencyToNote(frequency: number | null): NoteInfo | null {
  // console.log(`Freq: ${frequency}`)
  if (frequency === null || !Number.isFinite(frequency) || frequency <= 0) {
    return null
  }
  // Find MIDI note number:
  const closestMidiNoteNumber = getClosestMIDINote(frequency)

  // Find octave.
  const octave = Math.floor(closestMidiNoteNumber / 12) - 1
  const noteName = NOTES[closestMidiNoteNumber % 12]

  // How many cents sharp/flat is the note?
  const targetNoteFrequency =
    A4_FREQUENCY * Math.pow(2, (closestMidiNoteNumber - A4_MIDI) / 12)
  const cents = 1200 * Math.log2(frequency / targetNoteFrequency)

  return {
    note: noteName.name,
    accidental: accidentalToString(noteName.accidental),
    octave,
    frequency,
    cents,
    isInTune: Math.abs(cents) <= ALLOWED_DEVIATION,
  }
}

function getClosestMIDINote(frequency: number): number {
  const MIDIWithDecimals = A4_MIDI + 12 * Math.log2(frequency / A4_FREQUENCY)
  const closestMidiNoteNumber = Math.round(MIDIWithDecimals)
  return closestMidiNoteNumber
}
