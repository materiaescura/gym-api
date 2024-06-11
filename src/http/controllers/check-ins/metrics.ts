import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const { count } = await makeGetUserMetricsUseCase().execute({
    userId: request.user.sub,
  })
  return reply.status(200).send({ count })
}
