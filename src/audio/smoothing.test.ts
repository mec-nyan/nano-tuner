import { describe, expect, it } from 'vitest'
import { createSmoother } from './smoothing'

describe('createSmoother', () => {
  it('should return the single value when only one value is passed', () => {
    const smoother = createSmoother()
    expect(smoother(42)).toBe(42)
  })

  it('should return the average of multiple values', () => {
    const smoother = createSmoother()
    smoother(10)
    smoother(20)
    const result = smoother(30)
    expect(result).toBe(20) // (10 + 20 + 30) / 3 == 20
  })

  it('should maintain a sliding window of the specified size', () => {
    const smoother = createSmoother(3)
    smoother(10)
    smoother(20)
    smoother(30)
    smoother(40) // history is now [20, 30, 40]
    const result = smoother(50) // history is now [30, 40, 50]
    expect(result).toBe(40) // (30 + 40 + 50) / 3 == 40
  })

  it('should reset history when null is passed', () => {
    const smoother = createSmoother()
    smoother(10)
    smoother(20)
    const reset = smoother(null)
    expect(reset).toBeNull()

    const afterReset = smoother(30)
    expect(afterReset).toBe(30) // Only one value now
  })

  it('should use default size of 5', () => {
    const smoother = createSmoother()
    for (let i = 0; i < 10; i++) {
      smoother(i)
    }

    // history should now be [5, 6, 7, 8, 9]
    const result = smoother(10)
    expect(result).toBe((6 + 7 + 8 + 9 + 10) / 5)
  })

  it('should work with zero and negative values', () => {
    const smoother = createSmoother()
    smoother(10)
    smoother(-5)
    const result = smoother(0)
    expect(result).toBe((10 - 5 + 0) / 3)
  })
})
