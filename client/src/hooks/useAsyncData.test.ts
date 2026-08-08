import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useAsyncData } from './useAsyncData'

describe('useAsyncData', () => {
  it('starts in loading state and transitions to success', async () => {
    const { result } = renderHook(() => useAsyncData(() => Promise.resolve('data'), []))

    expect(result.current.status).toBe('loading')

    await waitFor(() => expect(result.current.status).toBe('success'))
    expect(result.current).toEqual({ status: 'success', data: 'data' })
  })

  it('transitions from loading to error when the fetcher rejects', async () => {
    const error = new Error('boom')
    const { result } = renderHook(() => useAsyncData(() => Promise.reject(error), []))

    await waitFor(() => expect(result.current.status).toBe('error'))
    expect(result.current).toEqual({ status: 'error', error })
  })

  it('returns empty state without fetching, when fetcher is null', () => {
    const { result } = renderHook(() => useAsyncData<string>(null, []))

    expect(result.current).toEqual({ status: 'empty' })
  })
})
