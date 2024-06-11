import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import app from '@/app'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    app.ready()
  })
  afterAll(async () => {
    app.close()
  })
  it('should be able authenticate', async () => {
    await request(app.server).post('/users').send({
      name: 'vitoria',
      email: 'vitoria@mail.com',
      password: '123456',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'vitoria@mail.com',
      password: '123456',
    })

    expect(response.status).toEqual(200)
    expect(response.body.token).toBeTypeOf('string')
  })
})
