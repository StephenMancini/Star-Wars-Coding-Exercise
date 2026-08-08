import { useEffect, useState, type DependencyList } from 'react'

export type AsyncState<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: unknown }
  | { status: 'empty' }

export function useAsyncData<T>(
  fetcher: (() => Promise<T>) | null,
  deps: DependencyList,
): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>(
    fetcher ? { status: 'loading' } : { status: 'empty' },
  )

  useEffect(() => {
    if (!fetcher) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- resets stale data when the caller switches to no-fetcher (e.g. deselecting a character)
      setState({ status: 'empty' })
      return
    }

    let cancelled = false
    setState({ status: 'loading' })

    fetcher()
      .then((data) => {
        if (!cancelled) {
          setState({ status: 'success', data })
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState({ status: 'error', error })
        }
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- deps is forwarded verbatim by callers, like useEffect itself
  }, deps)

  return state
}
