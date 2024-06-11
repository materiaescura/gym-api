import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyBodySchema = z.object({
    userLatitude: z.coerce.number().refine((value) => Math.abs(value) <= 90),
    userLongitude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
  })

  const { userLatitude, userLongitude } = nearbyBodySchema.parse(request.query)
  const { gyms } = await makeFetchNearbyGymsUseCase().execute({
    userLatitude,
    userLongitude,
  })
  return reply.status(200).send({ gyms })
}
