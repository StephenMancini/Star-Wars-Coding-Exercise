import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AsyncStateView } from './AsyncStateView'

describe('AsyncStateView', () => {
  it('renders a loading indicator when status is loading', () => {
    render(<AsyncStateView state={{ status: 'loading' }} onSuccess={() => null} />)

    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('renders an error message when status is error', () => {
    render(<AsyncStateView state={{ status: 'error', error: new Error('boom') }} onSuccess={() => null} />)

    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('renders the empty fallback when status is empty', () => {
    render(
      <AsyncStateView
        state={{ status: 'empty' }}
        onSuccess={() => null}
        emptyFallback={<p>Nothing selected</p>}
      />,
    )

    expect(screen.getByText('Nothing selected')).toBeInTheDocument()
  })

  it('renders onSuccess content with the resolved data when status is success', () => {
    render(
      <AsyncStateView
        state={{ status: 'success', data: 'Luke Skywalker' }}
        onSuccess={(data) => <p>{data}</p>}
      />,
    )

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
  })
})
