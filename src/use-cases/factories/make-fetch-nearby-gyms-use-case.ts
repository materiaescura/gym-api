import { FetchNerabyGymsUseCase } from '../fetch-nearby-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma.gyms-repository'

export function makeFetchNearbyGymsUseCase() {
  const repository = new PrismaGymsRepository()
  const useCase = new FetchNerabyGymsUseCase(repository)
  return useCase
}
