import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import app from '@/app'
import request from 'supertest'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Check-ins (e2e)', () => {
  beforeEach(async () => {
    app.ready()
  })

  afterEach(async () => {
    app.close()
  })

  it('should be able to create check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', 'Bearer ' + token)
      .send({
        userLatitude: -27.2092052,
        userLongitude: -49.6401091,
      })

    expect(response.status).toEqual(201)
  })
})
