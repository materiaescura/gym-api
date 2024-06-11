import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import app from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    app.ready()
  })
  afterAll(async () => {
    app.close()
  })
  it('should be able get profile', async () => {
    const { token, name, email, role } = await createAndAuthenticateUser(app)
    const response = await request(app.server)
      .get('/me')
      .set('Authorization', 'Bearer ' + token)
      .send()

    expect(response.status).toEqual(200)
    expect(response.body).toMatchObject({
      name,
      email,
      role,
    })
  })
})
