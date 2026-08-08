import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Species } from '../../../api/types'
import { SpeciesCard } from './SpeciesCard'

const species: Species = {
  name: 'Human',
  classification: 'mammal',
  designation: 'sentient',
  averageHeight: '180',
  averageLifespan: '120',
  language: 'Galactic Basic',
}

describe('SpeciesCard', () => {
  it('renders species fields when present', () => {
    render(<SpeciesCard species={species} />)

    expect(screen.getByText('Human')).toBeInTheDocument()
    expect(screen.getByText('mammal')).toBeInTheDocument()
    expect(screen.getByText('sentient')).toBeInTheDocument()
    expect(screen.getByText('180')).toBeInTheDocument()
    expect(screen.getByText('120')).toBeInTheDocument()
    expect(screen.getByText('Galactic Basic')).toBeInTheDocument()
  })

  it('renders an empty state when species is null', () => {
    render(<SpeciesCard species={null} />)

    expect(screen.getByText(/species unknown/i)).toBeInTheDocument()
  })
})
