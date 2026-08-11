import type { ReactNode } from 'react'
import type { AsyncState } from '../hooks/useAsyncData'

interface AsyncStateViewProps<T> {
  readonly state: AsyncState<T>
  readonly onSuccess: (data: T) => ReactNode
  readonly loadingFallback?: ReactNode
  readonly errorFallback?: ReactNode
  readonly emptyFallback?: ReactNode
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
      return <>{loadingFallback ?? <output>Loading…</output>}</>
    case 'error':
      return <>{errorFallback ?? <p role="alert">Something went wrong.</p>}</>
    case 'empty':
      return <>{emptyFallback ?? null}</>
    case 'success':
      return <>{onSuccess(state.data)}</>
  }
}
