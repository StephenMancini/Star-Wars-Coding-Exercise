import { describe, expect, it } from 'vitest'
import { http, HttpResponse } from 'msw'
import { server } from '../test/mocks/server'
import { ApiError, httpClient } from './httpClient'

describe('httpClient.get', () => {
  it('parses a successful JSON response', async () => {
    server.use(http.get('/api/ping', () => HttpResponse.json({ ok: true })))

    const result = await httpClient.get<{ ok: boolean }>('/api/ping')

    expect(result).toEqual({ ok: true })
  })

  it('throws ApiError on a 500 response', async () => {
    server.use(http.get('/api/ping', () => new HttpResponse(null, { status: 500 })))

    await expect(httpClient.get('/api/ping')).rejects.toBeInstanceOf(ApiError)
  })
})
