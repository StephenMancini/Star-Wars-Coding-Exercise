import { describe, expect, it } from 'vitest'
import { toRomanNumeral } from './toRomanNumeral'

describe('toRomanNumeral', () => {
  it.each([
    [1, 'I'],
    [3, 'III'],
    [4, 'IV'],
    [5, 'V'],
    [6, 'VI'],
    [9, 'IX'],
    [1977, 'MCMLXXVII'],
  ])('converts %i to %s', (input, expected) => {
    expect(toRomanNumeral(input)).toBe(expected)
  })
})
