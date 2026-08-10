// Scoped to the 9 mainline Star Wars episode numbers rather than being a general-purpose
// converter — that's the only range this app ever needs to display.
const EPISODE_NUMERALS = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX']

export function toRomanNumeral(episodeId: number): string {
  return EPISODE_NUMERALS[episodeId]
}
