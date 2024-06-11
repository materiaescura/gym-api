import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import app from '@/app'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    app.ready()
  })
  afterAll(async () => {
    app.close()
  })
  it('should be able register', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'vitoria',
      email: 'vitoria@mail.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })
})
