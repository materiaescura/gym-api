import { PrimaUsersRepositroy } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '../get-user-profile'

export function makeGetUserProfileUseCase() {
  const repository = new PrimaUsersRepositroy()
  const useCase = new GetUserProfileUseCase(repository)
  return useCase
}
