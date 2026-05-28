import { describe, expect, it } from 'vitest'
import { accidentalToString } from './audioConstants'

describe('Gets the appropriate musical symbol', () => {
  it('Music flat symbol', () => {
    const flatSymbol = accidentalToString('flat')

    expect(flatSymbol).toBe('♭')
  })
  it('Music sharp symbol', () => {
    const sharpSymbol = accidentalToString('sharp')

    expect(sharpSymbol).toBe('♯')
  })
  it('None', () => {
    const noneSymbol = accidentalToString(null)

    expect(noneSymbol).toBe('')
  })
})
