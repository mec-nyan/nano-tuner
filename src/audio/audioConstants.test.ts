import { describe, expect, it } from 'vitest'
import { accidentalToString } from './audioConstants'

describe('Gets the appropriate musical symbol', () => {
  it('should return the musical flat symbol', () => {
    const flatSymbol = accidentalToString('flat')

    expect(flatSymbol).toBe('♭')
  })

  it('should return the musical sharp symbol', () => {
    const sharpSymbol = accidentalToString('sharp')

    expect(sharpSymbol).toBe('♯')
  })

  it('should return an empty string', () => {
    const noneSymbol = accidentalToString(null)

    expect(noneSymbol).toBe('')
  })
})
