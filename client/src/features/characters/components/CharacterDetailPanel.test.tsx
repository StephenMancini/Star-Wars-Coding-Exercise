import { render, screen, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'
import { server } from '../../../test/mocks/server'
import type { CharacterDetail } from '../../../api/types'
import { CharacterDetailPanel } from './CharacterDetailPanel'

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

describe('CharacterDetailPanel', () => {
  it('renders an empty state when nothing is selected', () => {
    render(<CharacterDetailPanel selectedId={null} />)

    expect(screen.getByText(/select a character/i)).toBeInTheDocument()
  })

  it('renders a loading state and then the full character detail', async () => {
    server.use(http.get('/api/characters/1', () => HttpResponse.json(detail)))

    render(<CharacterDetailPanel selectedId={1} />)

    expect(screen.getByRole('status')).toBeInTheDocument()

    await waitFor(() =>
      expect(screen.getByRole('heading', { name: 'Luke Skywalker' })).toBeInTheDocument(),
    )
    expect(screen.getByText('172')).toBeInTheDocument()
  })

  it('renders an error state when the request fails', async () => {
    server.use(http.get('/api/characters/1', () => new HttpResponse(null, { status: 500 })))

    render(<CharacterDetailPanel selectedId={1} />)

    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument())
  })
})
