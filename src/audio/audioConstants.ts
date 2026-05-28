export type accidental = 'flat' | 'sharp' | null

export interface NoteName {
  name: string
  accidental: accidental
}

class Note {
  private _name: NoteName
  private _altName?: NoteName
  constructor(name: NoteName, altName?: NoteName) {
    this._name = name
    this._altName = altName
  }

  name(acc?: accidental): NoteName {
    if (acc === undefined) {
      return this._name
    }

    if (this._name.accidental === null) {
      return this._name
    }

    if (acc === null) {
      return this._name
    }

    if (acc === this._name.accidental) {
      return this._name
    } else if (acc === this._altName?.accidental) {
      return this._altName
    } else {
      throw new Error('Invalid note.')
    }
  }
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
export const NOTES: Note[] = [
  new Note({ name: 'C', accidental: null }),
  new Note(
    { name: 'C', accidental: 'sharp' },
    { name: 'D', accidental: 'flat' }
  ),
  new Note({ name: 'D', accidental: null }),
  new Note(
    { name: 'D', accidental: 'sharp' },
    { name: 'E', accidental: 'flat' }
  ),
  new Note({ name: 'E', accidental: null }),
  new Note({ name: 'F', accidental: null }),
  new Note(
    { name: 'F', accidental: 'sharp' },
    { name: 'G', accidental: 'flat' }
  ),
  new Note({ name: 'G', accidental: null }),
  new Note(
    { name: 'G', accidental: 'sharp' },
    { name: 'A', accidental: 'flat' }
  ),
  new Note({ name: 'A', accidental: null }),
  new Note(
    { name: 'A', accidental: 'sharp' },
    { name: 'B', accidental: 'flat' }
  ),
  new Note({ name: 'B', accidental: null }),
]

export const A0_MIDI = 21

export const A4_FREQUENCY = 440

export const A4_MIDI_NUMBER = 69

export const ALLOWED_DEVIATION = 3
