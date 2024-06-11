import app from '@/app'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import request from 'supertest'

describe('Refresh (e2e)', () => {
  beforeEach(async () => {
    await app.ready()
  })
  afterEach(async () => {
    await app.close()
  })
  it('should be able refresh token', async () => {
    await request(app.server).post('/users').send({
      name: 'any_name',
      email: 'any@mail.com',
      password: 'any_password',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'any@mail.com',
      password: 'any_password',
    })

    const cookies = authResponse.get('Set-Cookie') as string[]

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({ token: expect.any(String) })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
