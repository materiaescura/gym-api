import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false
) {
  const name = 'any'
  const email = 'any@mail.com'
  const password = 'any_password'
  const role = isAdmin ? 'ADMIN' : 'MEMBER'

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: await hash(password, 6),
      role,
    },
  })

  const authResponse = await request(app.server)
    .post('/sessions')
    .send({ email, password })

  const { token } = authResponse.body

  return {
    token,
    name,
    email,
    role,
  }
}
