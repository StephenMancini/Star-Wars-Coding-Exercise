import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Film } from '../../../api/types'
import { FilmsStrip } from './FilmsStrip'

describe('FilmsStrip', () => {
  it('renders each film title with its roman-numeral episode', () => {
    const films: Film[] = [
      { title: 'A New Hope', episodeId: 4 },
      { title: 'The Empire Strikes Back', episodeId: 5 },
    ]

    render(<FilmsStrip films={films} />)

    expect(screen.getByText(/A New Hope/)).toBeInTheDocument()
    expect(screen.getByText(/Episode IV/)).toBeInTheDocument()
    expect(screen.getByText(/The Empire Strikes Back/)).toBeInTheDocument()
    expect(screen.getByText(/Episode V/)).toBeInTheDocument()
  })

  it('renders an empty state when there are no films', () => {
    render(<FilmsStrip films={[]} />)

    expect(screen.getByText(/no films/i)).toBeInTheDocument()
  })

  it('sorts films by episode number ascending, regardless of input order', () => {
    const films: Film[] = [
      { title: 'Revenge of the Sith', episodeId: 3 },
      { title: 'A New Hope', episodeId: 4 },
      { title: 'The Phantom Menace', episodeId: 1 },
    ]

    render(<FilmsStrip films={films} />)

    const titles = screen.getAllByRole('listitem').map((item) => item.textContent)
    expect(titles[0]).toContain('The Phantom Menace')
    expect(titles[1]).toContain('Revenge of the Sith')
    expect(titles[2]).toContain('A New Hope')
  })
})
