import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

    render(<CharacterListPanel selectedId={null} onSelectCharacter={() => {}} />)

    await waitFor(() => expect(screen.getByText('Luke Skywalker')).toBeInTheDocument())
    expect(screen.getByText('Leia Organa')).toBeInTheDocument()
  })

  it('filters the list instantly as the user types, with zero additional network calls', async () => {
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
    const user = userEvent.setup()

    render(<CharacterListPanel selectedId={null} onSelectCharacter={() => {}} />)
    await waitFor(() => expect(screen.getByText('Luke Skywalker')).toBeInTheDocument())

    await user.type(screen.getByRole('searchbox'), 'Leia')

    expect(screen.getByText('Leia Organa')).toBeInTheDocument()
    expect(screen.queryByText('Luke Skywalker')).not.toBeInTheDocument()
    expect(callCount).toBe(1)
  })

  it('renders an empty state when no characters match the search', async () => {
    server.use(http.get('/api/characters', () => HttpResponse.json([{ id: 1, name: 'Luke Skywalker' }])))
    const user = userEvent.setup()

    render(<CharacterListPanel selectedId={null} onSelectCharacter={() => {}} />)
    await waitFor(() => expect(screen.getByText('Luke Skywalker')).toBeInTheDocument())

    await user.type(screen.getByRole('searchbox'), 'Zzz')

    expect(screen.getByText(/no characters match/i)).toBeInTheDocument()
  })

  it('renders an error state when the request fails', async () => {
    server.use(http.get('/api/characters', () => new HttpResponse(null, { status: 500 })))

    render(<CharacterListPanel selectedId={null} onSelectCharacter={() => {}} />)

    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument())
  })
})
