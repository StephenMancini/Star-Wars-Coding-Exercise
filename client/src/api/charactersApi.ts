import { httpClient } from './httpClient'
import type { CharacterDetail, CharacterSummary } from './types'

export const charactersApi = {
  getCharacters: () => httpClient.get<CharacterSummary[]>('/api/characters'),
  getCharacterById: (id: number) => httpClient.get<CharacterDetail>(`/api/characters/${id}`),
}
