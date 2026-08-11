import { describe, expect, it } from 'vitest'
import { toRomanNumeral } from './toRomanNumeral'

describe('toRomanNumeral', () => {
  it.each([
    [1, 'I'],
    [2, 'II'],
    [3, 'III'],
    [4, 'IV'],
    [5, 'V'],
    [6, 'VI'],
    [7, 'VII'],
    [8, 'VIII'],
    [9, 'IX'],
  ])('converts episode %i to %s', (input, expected) => {
    expect(toRomanNumeral(input)).toBe(expected)
  })

  it.each([
    [0, '0'],
    [-1, '-1'],
    [10, '10'],
    [100, '100'],
  ])('falls back to the raw number %i as a string, for out-of-range input', (input, expected) => {
    expect(toRomanNumeral(input)).toBe(expected)
  })
})
