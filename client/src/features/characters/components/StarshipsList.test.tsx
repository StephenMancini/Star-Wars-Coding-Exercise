import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Starship } from '../../../api/types'
import { StarshipsList } from './StarshipsList'

describe('StarshipsList', () => {
  it('renders each starship', () => {
    const starships: Starship[] = [
      {
        name: 'X-wing',
        model: 'T-65 X-wing',
        manufacturer: 'Incom Corporation',
        crew: '1',
        passengers: '0',
        starshipClass: 'Starfighter',
      },
    ]

    render(<StarshipsList starships={starships} />)

    const item = screen.getByRole('listitem')
    expect(item).toHaveTextContent('X-wing')
    expect(item).toHaveTextContent('T-65 X-wing')
    expect(item).toHaveTextContent('Incom Corporation')
  })

  it('renders an empty state when there are no starships', () => {
    render(<StarshipsList starships={[]} />)

    expect(screen.getByText(/no starships/i)).toBeInTheDocument()
  })
})
