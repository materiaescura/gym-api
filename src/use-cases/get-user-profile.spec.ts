import { UsersRepository } from '@/repositories/users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserProfileUseCase } from './get-user-profile'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'

describe('Get user profile use case', () => {
  let usersRepository: UsersRepository
  let sut: GetUserProfileUseCase
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })
  it('should be able to get user profile', async () => {
    const user = await usersRepository.create({
      name: 'any_name',
      email: 'any@mail.com',
      password_hash: await hash('any_passowrd', 6),
    })
    const response = await sut.execute({ userId: user.id })
    expect(response.user).toMatchObject(user)
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({ userId: 'wrong_id' })
    ).rejects.toThrowError('Resource not found.')
  })
})
