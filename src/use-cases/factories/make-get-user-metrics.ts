import { PrimaUsersRepositroy } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate'
import { GetUserMetricsUseCase } from '../get-user-metrics'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-checkins-repository'

export function makeGetUserMetricsUseCase() {
  const repository = new PrismaCheckInsRepository()
  const useCase = new GetUserMetricsUseCase(repository)
  return useCase
}
