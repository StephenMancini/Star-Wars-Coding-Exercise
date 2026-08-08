import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { CharacterAttributes } from '../../../api/types'
import { AttributesCard } from './AttributesCard'

const attributes: CharacterAttributes = {
  height: '172',
  mass: '77',
  hairColor: 'blond',
  skinColor: 'fair',
  eyeColor: 'blue',
  birthYear: '19BBY',
  gender: 'male',
}

describe('AttributesCard', () => {
  it('renders every attribute field', () => {
    render(<AttributesCard attributes={attributes} />)

    expect(screen.getByText('172')).toBeInTheDocument()
    expect(screen.getByText('77')).toBeInTheDocument()
    expect(screen.getByText('blond')).toBeInTheDocument()
    expect(screen.getByText('fair')).toBeInTheDocument()
    expect(screen.getByText('blue')).toBeInTheDocument()
    expect(screen.getByText('19BBY')).toBeInTheDocument()
    expect(screen.getByText('male')).toBeInTheDocument()
  })
})
