import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import app from '@/app'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby gyms (e2e)', () => {
  beforeEach(async () => {
    app.ready()
  })

  afterEach(async () => {
    app.close()
  })

  it('should be able list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app)
    await request(app.server)
      .post('/gyms')
      .set('Authorization', 'Bearer ' + token)
      .send({
        title: 'Gym - 01',
        description: 'Desc Gym - 01',
        phone: '00000000',
        latitude: 40.7128,
        longitude: 74.006,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', 'Bearer ' + token)
      .send({
        title: 'Gym - 02',
        description: 'Desc Gym - 02',
        phone: '11111111',
        latitude: 35.6895,
        longitude: 139.6917,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        userLatitude: '35.6894',
        userLongitude: '139.6917',
      })
      .set('Authorization', 'Bearer ' + token)
      .send()

    expect(response.status).toEqual(200)
  })
})
