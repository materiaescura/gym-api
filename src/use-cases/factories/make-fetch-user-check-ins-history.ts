import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-checkins-repository'

export function makeFetchUserCheckInsHistoryUseCase() {
  const repository = new PrismaCheckInsRepository()
  const useCase = new FetchUserCheckInsHistoryUseCase(repository)
  return useCase
}
