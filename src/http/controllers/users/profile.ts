import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const { user } = await makeGetUserProfileUseCase().execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    ...user,
    password_hash: undefined,
  })
}
