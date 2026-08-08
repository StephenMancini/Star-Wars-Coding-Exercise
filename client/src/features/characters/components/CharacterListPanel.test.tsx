import { render, screen, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'
import { server } from '../../../test/mocks/server'
import { CharacterListPanel } from './CharacterListPanel'

describe('CharacterListPanel', () => {
  it('renders character names once loaded', async () => {
    server.use(
      http.get('/api/characters', () =>
        HttpResponse.json([
          { id: 1, name: 'Luke Skywalker' },
          { id: 2, name: 'Leia Organa' },
        ]),
      ),
    )

    render(<CharacterListPanel query="" selectedId={null} onSelectCharacter={() => {}} />)

    await waitFor(() => expect(screen.getByText('Luke Skywalker')).toBeInTheDocument())
    expect(screen.getByText('Leia Organa')).toBeInTheDocument()
  })

  it('filters the list based on the query prop, with zero additional network calls', async () => {
    let callCount = 0
    server.use(
      http.get('/api/characters', () => {
        callCount++
        return HttpResponse.json([
          { id: 1, name: 'Luke Skywalker' },
          { id: 2, name: 'Leia Organa' },
        ])
      }),
    )

    const { rerender } = render(
      <CharacterListPanel query="" selectedId={null} onSelectCharacter={() => {}} />,
    )
    await waitFor(() => expect(screen.getByText('Luke Skywalker')).toBeInTheDocument())

    rerender(<CharacterListPanel query="Leia" selectedId={null} onSelectCharacter={() => {}} />)

    expect(screen.getByText('Leia Organa')).toBeInTheDocument()
    expect(screen.queryByText('Luke Skywalker')).not.toBeInTheDocument()
    expect(callCount).toBe(1)
  })

  it('renders an empty state when no characters match the query', async () => {
    server.use(http.get('/api/characters', () => HttpResponse.json([{ id: 1, name: 'Luke Skywalker' }])))

    render(<CharacterListPanel query="Zzz" selectedId={null} onSelectCharacter={() => {}} />)

    await waitFor(() => expect(screen.getByText(/no characters match/i)).toBeInTheDocument())
  })

  it('renders an error state when the request fails', async () => {
    server.use(http.get('/api/characters', () => new HttpResponse(null, { status: 500 })))

    render(<CharacterListPanel query="" selectedId={null} onSelectCharacter={() => {}} />)

    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument())
  })
})
