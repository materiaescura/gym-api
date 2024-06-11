import { GymsRepository } from '@/repositories/gyms-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { CreateGymUseCase, CreateGymUseCaseRequest } from './create-gym'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Prisma } from '@prisma/client'

describe('Create gym use case', () => {
  let gymsRepository: GymsRepository
  let sut: CreateGymUseCase

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able create a gym', async () => {
    const data: CreateGymUseCaseRequest = {
      title: 'js_gym',
      description: 'The best js gym',
      phone: '(99) 99999-9999',
      latitude: -27.2092052,
      longitude: -49.6401091,
    }

    const { gym } = await sut.execute(data)

    expect(gym.id).toEqual(expect.any(String))
    expect(gym).toMatchObject({
      ...data,
      longitude: new Prisma.Decimal(data.longitude.toString()),
      latitude: new Prisma.Decimal(data.latitude.toString()),
    })
  })
})
