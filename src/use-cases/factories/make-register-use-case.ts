import { PrimaUsersRepositroy } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const repository = new PrimaUsersRepositroy()
  const useCase = new RegisterUseCase(repository)
  return useCase
}
