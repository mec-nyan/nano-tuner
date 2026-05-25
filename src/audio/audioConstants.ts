export type accidental = 'flat' | 'sharp' | null

export interface NoteName {
  name: string
  accidental: accidental
}

export function accidentalToString(acc: accidental): string {
  switch (acc) {
    case 'flat':
      return '♭'
    case 'sharp':
      return '♯'
    default:
      return ''
  }
}

// TODO: Use a musical font to show 'b' and '#' instead of 'lowercase B' and 'hash'.
export const NOTES: NoteName[] = [
  {
    name: 'C',
    accidental: null,
  },
  {
    name: 'C',
    accidental: 'sharp',
  },
  {
    name: 'D',
    accidental: null,
  },
  {
    name: 'E',
    accidental: 'flat',
  },
  {
    name: 'E',
    accidental: null,
  },
  {
    name: 'F',
    accidental: null,
  },
  {
    name: 'F',
    accidental: 'sharp',
  },
  {
    name: 'G',
    accidental: null,
  },
  {
    name: 'A',
    accidental: 'flat',
  },
  {
    name: 'A',
    accidental: null,
  },
  {
    name: 'B',
    accidental: 'flat',
  },
  {
    name: 'B',
    accidental: null,
  },
]

export const A0_MIDI = 21

export const A4_FREQUENCY = 440

export const A4_MIDI_NUMBER = 69

export const ALLOWED_DEVIATION = 3
