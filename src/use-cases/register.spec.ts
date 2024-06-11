import { UsersRepository } from '@/repositories/users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare, hash } from 'bcryptjs'

describe('Register use case', () => {
  let usersRepository: UsersRepository
  let sut: RegisterUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able register a user', async () => {
    const name = 'any_name'
    const email = 'any@mail.com'
    const password = 'any_password'
    const { user } = await sut.execute({ name, email, password })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const name = 'any_name'
    const email = 'any@mail.com'
    const password = 'any_password'
    const { user } = await sut.execute({ name, email, password })

    const isPasswordCorrectlyHashed = await compare(
      password,
      user.password_hash
    )
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able register a user with same email twice', async () => {
    const name = 'any_name'
    const email = 'any@mail.com'
    const password = 'any_password'
    usersRepository.create({
      name,
      email,
      password_hash: await hash(password, 6),
    })
    await expect(() =>
      sut.execute({ name, email, password })
    ).rejects.toThrowError('User already exists.')
  })
})
