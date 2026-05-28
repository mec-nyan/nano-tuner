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
 * The given frequency may be other than the exact frequency of a note in 12 TET, so we
 * may end up with a decimal number, which is good.  We can then `round` that number to
 * get the closest number of a note in tune according to the selected base note. So
 *
 *     closest_note = round(a + 12 * log2(fn/fa))
 *
 *     where a = 69, fa = 440 and fn = 470.0
 *
 *     closest_note = round(69 + 12 * log2(470.0/440.0))
 *                  = round(69 + 12 * 0.0951...)
 *                  = round(69 * 1.1418...)
 *                  = round(70.1418...)
 *                  = 70
 *
 *     and `70` (Bb4) is the closest note number for that frequency.
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
  A4_MIDI_NUMBER,
  ALLOWED_DEVIATION,
  NOTES,
  type accidental,
} from './audioConstants'

import { accidentalToString } from './audioConstants'

/**
 * NoteInfo contains the musical note information of a given frequency
 */
export interface NoteInfo {
  note: string
  accidental: string
  octave: number
  frequency: number
  cents: number
  isInTune: boolean
}

/**
 * frequencyToNote give the note information for a given frequency.
 */
export function frequencyToNote(
  frequency: number | null,
  base: number,
  acc?: accidental
): NoteInfo | null {
  if (frequency === null || !Number.isFinite(frequency) || frequency <= 0) {
    return null
  }
  // Find MIDI note number:
  const closestMidiNoteNumber = getClosestNoteNumber(frequency, base)

  // Find octave.
  const octave = Math.floor(closestMidiNoteNumber / 12) - 1
  const note = NOTES[closestMidiNoteNumber % 12]
  const noteName = note.name(acc)

  // How many cents sharp/flat is the note?
  const targetNoteFrequency =
    base * Math.pow(2, (closestMidiNoteNumber - A4_MIDI_NUMBER) / 12)
  const cents = getCents(frequency, targetNoteFrequency)

  return {
    note: noteName.name,
    accidental: accidentalToString(noteName.accidental),
    octave,
    frequency,
    cents,
    isInTune: Math.abs(cents) <= ALLOWED_DEVIATION,
  }
}

/**
 * getClosestNoteNumber get the closest MIDI note number for the given frequency.
 *
 * The given frequency may be other than the exact frequency of a note in 12 TET, so we
 * may end up with a decimal number, which is good.  We can then `round` that number to
 * get the closest number of a note in tune according to the selected base note. So
 *
 *     closest_note = round(a + 12 * log2(fn/fa))
 *
 *     where a = 69, fa = 440 and fn = 470.0
 *
 *     closest_note = round(69 + 12 * log2(470.0/440.0))
 *                  = round(69 + 12 * 0.0951...)
 *                  = round(69 * 1.1418...)
 *                  = round(70.1418...)
 *                  = 70
 *
 *     and `70` (Bb4) is the closest note number for that frequency.
 *
 * See the related documentation on how this formula relates to 12 TET at the top of
 * this file.
 */
function getClosestNoteNumber(frequency: number, base: number): number {
  return Math.round(A4_MIDI_NUMBER + 12 * Math.log2(frequency / base))
}

/**
 * getCents get the difference between the current note/frequency to the closest note,
 * in cents.
 *
 *
 *     For `(How to calculate) Cents`
 *     @see https://en.wikipedia.org/wiki/Cent_(music)
 */
function getCents(frequency: number, target: number): number {
  return 1200 * Math.log2(frequency / target)
}
