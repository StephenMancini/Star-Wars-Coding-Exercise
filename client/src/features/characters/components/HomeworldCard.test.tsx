import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Homeworld } from '../../../api/types'
import { HomeworldCard } from './HomeworldCard'

const homeworld: Homeworld = {
  name: 'Tatooine',
  population: '200000',
  terrain: 'desert',
  climate: 'arid',
  surfaceWater: '1',
  diameter: '10465',
  rotationPeriod: '23',
  orbitalPeriod: '304',
  gravity: '1 standard',
}

describe('HomeworldCard', () => {
  it('renders homeworld fields when present', () => {
    render(<HomeworldCard homeworld={homeworld} />)

    expect(screen.getByText('Tatooine')).toBeInTheDocument()
    expect(screen.getByText('200000')).toBeInTheDocument()
    expect(screen.getByText('desert')).toBeInTheDocument()
    expect(screen.getByText('arid')).toBeInTheDocument()
  })

  it('renders an empty state when homeworld is null', () => {
    render(<HomeworldCard homeworld={null} />)

    expect(screen.getByText(/homeworld unknown/i)).toBeInTheDocument()
  })
})
