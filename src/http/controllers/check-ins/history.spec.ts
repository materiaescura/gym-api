import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import app from '@/app'
import request from 'supertest'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('History check-ins (e2e)', () => {
  beforeEach(async () => {
    app.ready()
  })

  afterEach(async () => {
    app.close()
  })

  it('should be able to fetch history check-ins', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'gym',
        latitude: 90,
        longitude: 180,
      },
    })

    await prisma.checkin.createMany({
      data: [
        {
          user_id: user.id,
          gym_id: gym.id,
        },
        {
          user_id: user.id,
          gym_id: gym.id,
        },
      ],
    })

    const response = await request(app.server)
      .get(`/check-ins/history`)
      .set('Authorization', 'Bearer ' + token)
      .send()

    expect(response.status).toEqual(200)
  })
})
