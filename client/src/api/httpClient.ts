export class ApiError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export class NotFoundError extends ApiError {
  constructor(message = 'Not found') {
    super(message, 404)
    this.name = 'NotFoundError'
  }
}

async function get<T>(path: string): Promise<T> {
  const response = await fetch(path)

  if (response.status === 404) {
    throw new NotFoundError()
  }

  if (!response.ok) {
    throw new ApiError(`Request to ${path} failed with status ${response.status}`, response.status)
  }

  return (await response.json()) as T
}

export const httpClient = { get }
