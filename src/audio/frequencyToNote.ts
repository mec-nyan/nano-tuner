/**
 * Convert a given frequency to (a musical) note information.
 *
 * We're using 12 TET (12 tone equal temperament) in this app.
 * Consider adding other tuning systems in the future, although for most users that won't be
 * necessary.
 *
 * In 12 TET, we use a logarithmic (base 2) scale, in which a semitone is calculated by multiplying
 * the given frequency (or dividing the string length, etc) by the 12th root of 2:
 *
 *     f1 = f0 * (2 ^ (1/12))  where `f1` is the frequency 1 semitone up from `f0`.
 *
 * If we keep doing this, by the time we're 12 semitones up we reach the `octave` of the first note
 * (double the frequency, half the length of the string, etc) because:
 *
 *     f1 = f0 * (2 ^ (1/12))
 *     f2 = f1 * (2 ^ (1/12)) = f0 * (2 ^ (2/12))
 *     ...
 *     f12 = f0 * (2 ^ (12/12))
 *
 * which is the same as
 *
 *    f12 = f0 * (2 ^ 1) = f0 * 2
 *
 * Then, to obtain a note `n` we need a base note `a` of a given (fixed) frequency (i.e. A4 = 440 Hz).
 * We can use the following formula:
 *
 *    fn = fa * (2 ^ ((n-a)/12))
 *
 * For example if `fa` is `440` and `a` is `69` (`A4` in standard tuning) and we want to find the frequency
 * (or position/distance) `fn` where `n` is `72` (`C5`):
 *
 *    fn = 440 * (2 ^ ((72-69)/12))
 *       = 440 * (2 ^ (3/12))
 *       = 440 * 1.1892...
 *       = 523.2511...
 *
 * We can go the other way around to find the approximate `note number` by doing this instead:
 *
 *    fn = fa * (2 ^ ((n-a)/12))
 *
 *    fn / fa = 2 ^ ((n-a)/12)
 *
 *    log2(fn/fa) = (n-a) / 12
 *
 *    12 * log2(fn/fa) = n - a
 *
 *    a + 12 * log2(fn/fa) = n
 *
 * So:
 *
 *    n = a + 12 * log2(fn/fa)
 *
 * and Bob's your uncle!
 *
 * From Wikipedia, the free encyclopedia:
 *
 *     For `Scientific pith notation`
 *     @see https://en.wikipedia.org/wiki/Scientific_pitch_notation
 *
 *     For `Equal temperament`
 *     @see https://en.wikipedia.org/wiki/Equal_temperament
 *
 *     For `(How to calculate) Cents`
 *     @see https://en.wikipedia.org/wiki/Cent_(music)
 */

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

export function frequencyToNote(frequency: number | null): NoteInfo | null {
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
