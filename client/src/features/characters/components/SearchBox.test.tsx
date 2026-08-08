import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SearchBox } from './SearchBox'

describe('SearchBox', () => {
  it('renders the current value', () => {
    render(<SearchBox value="Luke" onChange={() => {}} />)

    expect(screen.getByRole('searchbox')).toHaveValue('Luke')
  })

  it('calls onChange with the new value as the user types', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<SearchBox value="" onChange={onChange} />)

    await user.type(screen.getByRole('searchbox'), 'Han')

    expect(onChange).toHaveBeenCalledWith('H')
    expect(onChange).toHaveBeenCalledWith('a')
    expect(onChange).toHaveBeenCalledWith('n')
  })
})
