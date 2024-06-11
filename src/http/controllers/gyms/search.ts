import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsBodySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = searchGymsBodySchema.parse(request.query)

  const { gyms } = await makeSearchGymsUseCase().execute({ query: q, page })
  return reply.status(200).send({ gyms })
}
