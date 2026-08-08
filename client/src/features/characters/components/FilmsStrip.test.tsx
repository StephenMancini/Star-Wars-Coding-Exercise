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
})
