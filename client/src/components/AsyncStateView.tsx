import type { ReactNode } from 'react'
import type { AsyncState } from '../hooks/useAsyncData'

interface AsyncStateViewProps<T> {
  state: AsyncState<T>
  onSuccess: (data: T) => ReactNode
  loadingFallback?: ReactNode
  errorFallback?: ReactNode
  emptyFallback?: ReactNode
}

export function AsyncStateView<T>({
  state,
  onSuccess,
  loadingFallback,
  errorFallback,
  emptyFallback,
}: AsyncStateViewProps<T>) {
  switch (state.status) {
    case 'loading':
      return <>{loadingFallback ?? <p role="status">Loading…</p>}</>
    case 'error':
      return <>{errorFallback ?? <p role="alert">Something went wrong.</p>}</>
    case 'empty':
      return <>{emptyFallback ?? null}</>
    case 'success':
      return <>{onSuccess(state.data)}</>
  }
}
