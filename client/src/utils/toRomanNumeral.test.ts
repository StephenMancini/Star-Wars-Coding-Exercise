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
})
