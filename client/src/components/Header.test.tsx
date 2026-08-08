import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Header } from './Header'

describe('Header', () => {
  it('renders the app title', () => {
    render(<Header query="" onQueryChange={() => {}} />)

    expect(screen.getByRole('heading', { name: /star wars character datapad/i })).toBeInTheDocument()
  })

  it('renders the search box with the given query', () => {
    render(<Header query="Luke" onQueryChange={() => {}} />)

    expect(screen.getByRole('searchbox')).toHaveValue('Luke')
  })

  it('calls onQueryChange as the user types', async () => {
    const onQueryChange = vi.fn()
    const user = userEvent.setup()
    render(<Header query="" onQueryChange={onQueryChange} />)

    await user.type(screen.getByRole('searchbox'), 'R2')

    expect(onQueryChange).toHaveBeenCalledWith('R')
    expect(onQueryChange).toHaveBeenCalledWith('2')
  })
})
