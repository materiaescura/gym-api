import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import app from '@/app'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { Gym } from '@prisma/client'

describe('Search gyms (e2e)', () => {
  beforeEach(async () => {
    app.ready()
  })
  afterEach(async () => {
    app.close()
  })
  it('should be able to search gyms by title', async () => {
    const { token } = await createAndAuthenticateUser(app, true)
    await request(app.server)
      .post('/gyms')
      .set('Authorization', 'Bearer ' + token)
      .send({
        title: 'any_gym',
        description: 'any_description',
        phone: 'any_phone',
        latitude: -40,
        longitude: 120,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', 'Bearer ' + token)
      .send({
        title: 'any_gym-02',
        description: 'any_description',
        phone: 'any_phone',
        latitude: -40,
        longitude: 120,
      })

    const response = await request(app.server)
      .get('/gyms')
      .set('Authorization', 'Bearer ' + token)
      .query({ q: '02' })
      .send()

    const { gyms } = response.body as { gyms: Gym[] }

    expect(response.status).toEqual(200)
    expect(gyms.length).toEqual(1)
    expect(gyms[0].title).toEqual('any_gym-02')
  })
})
