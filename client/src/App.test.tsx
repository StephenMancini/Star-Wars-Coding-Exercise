import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'
import { server } from './test/mocks/server'
import type { CharacterDetail, CharacterSummary } from './api/types'
import App from './App'

const summaries: CharacterSummary[] = [
  { id: 1, name: 'Luke Skywalker' },
  { id: 2, name: 'Leia Organa' },
]
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

describe('App', () => {
  it('lets the user select a character from the list and see their details', async () => {
    server.use(
      http.get('/api/characters', () => HttpResponse.json(summaries)),
      http.get('/api/characters/1', () => HttpResponse.json(detail)),
    )
    const user = userEvent.setup()

    render(<App />)

    expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument()
    expect(screen.getByText(/select a character/i)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Luke Skywalker' }))

    expect(await screen.findByRole('heading', { name: 'Luke Skywalker' })).toBeInTheDocument()
    expect(screen.getByText('172')).toBeInTheDocument()
  })

  it('filters the character list from the header search box, with a single network call', async () => {
    let callCount = 0
    server.use(
      http.get('/api/characters', () => {
        callCount++
        return HttpResponse.json(summaries)
      }),
    )
    const user = userEvent.setup()

    render(<App />)

    expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument()
    expect(screen.getByText('Leia Organa')).toBeInTheDocument()

    await user.type(screen.getByRole('searchbox'), 'Leia')

    expect(screen.getByText('Leia Organa')).toBeInTheDocument()
    expect(screen.queryByText('Luke Skywalker')).not.toBeInTheDocument()
    expect(callCount).toBe(1)
  })
})
