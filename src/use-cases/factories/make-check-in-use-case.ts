import { PrimaUsersRepositroy } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate'
import { CheckinUseCase } from '../checkin'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma.gyms-repository'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-checkins-repository'

export function makeCheckInUseCase() {
  const checKinsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CheckinUseCase(checKinsRepository, gymsRepository)

  return useCase
}
