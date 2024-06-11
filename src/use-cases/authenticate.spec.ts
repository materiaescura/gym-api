import { describe, it, expect, beforeEach } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate use case', () => {
  let usersRepository: UsersRepository
  let sut: AuthenticateUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })
  it('should be able to authenticate a user when the data is valid', async () => {
    const name = 'any_name'
    const email = 'any@mail.com'
    const password = 'any_password'

    usersRepository.create({
      name,
      email,
      password_hash: await hash(password, 6),
    })
    const { user } = await sut.execute({ email, password })

    expect(user.id).toEqual(expect.any(String))
    expect(user.email).toEqual(email)
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({ email: 'wrong@mail.com', password: 'any_password' })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const name = 'any_name'
    const email = 'any@mail.com'
    const password = 'any_password'
    const invalidPassword = 'invalid_password'

    usersRepository.create({
      name,
      email,
      password_hash: await hash(password, 6),
    })

    await expect(() =>
      sut.execute({ email, password: invalidPassword })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
