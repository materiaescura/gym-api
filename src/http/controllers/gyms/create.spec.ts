import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import request from 'supertest'
import app from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create gym (e2e)', () => {
  beforeEach(async () => {
    await app.ready()
  })
  afterEach(async () => {
    await app.close()
  })

  it('should be able create a gym', async () => {
    const gymRequest = {
      title: 'any_gym',
      description: 'any_description',
      phone: 'any_phone',
      latitude: -40,
      longitude: 120,
    }

    const { token } = await createAndAuthenticateUser(app, true)
    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', 'Bearer ' + token)
      .send(gymRequest)

    expect(response.status).toEqual(201)
    expect(response.body).toMatchObject({
      ...gymRequest,
      latitude: '-40',
      longitude: '120',
    })
  })
})
