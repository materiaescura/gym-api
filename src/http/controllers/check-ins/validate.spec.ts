import app from '@/app'
import { prisma } from '@/lib/prisma'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import request from 'supertest'

describe('Validate check-in (e2e)', () => {
  beforeEach(async () => {
    app.ready()
  })

  afterEach(async () => {
    app.close()
  })

  it('shoud be able to validate check-in', async () => {
    const { token } = await createAndAuthenticateUser(app, true)
    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'gym',
        latitude: 90,
        longitude: 180,
      },
    })

    const checkin = await prisma.checkin.create({
      data: {
        user_id: user.id,
        gym_id: gym.id,
      },
    })
    const response = await request(app.server)
      .patch(`/check-ins/${checkin.id}/validate`)
      .set('Authorization', 'Bearer ' + token)
      .send()

    const checkInValidated = await prisma.checkin.findFirst({
      where: { id: checkin.id },
    })

    expect(response.status).toEqual(204)
    expect(checkInValidated?.validated_at).toBeInstanceOf(Date)
  })
})
