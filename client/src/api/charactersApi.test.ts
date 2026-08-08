import { describe, expect, it } from 'vitest'
import { http, HttpResponse } from 'msw'
import { server } from '../test/mocks/server'
import { charactersApi } from './charactersApi'
import { NotFoundError } from './httpClient'
import type { CharacterDetail, CharacterSummary } from './types'

describe('charactersApi', () => {
  it('getCharacters returns typed summaries', async () => {
    const summaries: CharacterSummary[] = [{ id: 1, name: 'Luke Skywalker' }]
    server.use(http.get('/api/characters', () => HttpResponse.json(summaries)))

    const result = await charactersApi.getCharacters()

    expect(result).toEqual(summaries)
  })

  it('getCharacterById returns typed detail', async () => {
    const detail: CharacterDetail = {
      id: 1,
      name: 'Luke Skywalker',
      attributes: {
        height: '172',
        mass: '77',
        hairColor: 'blond',
        skinColor: 'fair',
        eyeColor: 'blue',
        birthYear: '19BBY',
        gender: 'male',
      },
      species: null,
      homeworld: null,
      films: [],
      starships: [],
      vehicles: [],
    }
    server.use(http.get('/api/characters/1', () => HttpResponse.json(detail)))

    const result = await charactersApi.getCharacterById(1)

    expect(result).toEqual(detail)
  })

  it('getCharacterById throws NotFoundError when the character does not exist', async () => {
    server.use(http.get('/api/characters/999', () => new HttpResponse(null, { status: 404 })))

    await expect(charactersApi.getCharacterById(999)).rejects.toBeInstanceOf(NotFoundError)
  })
})
