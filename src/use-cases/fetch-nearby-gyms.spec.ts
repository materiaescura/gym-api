import { GymsRepository } from '@/repositories/gyms-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { FetchNerabyGymsUseCase } from './fetch-nearby-gyms'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

describe('Fetch nearby gyms use case', () => {
  let gymsRepository: GymsRepository
  let sut: FetchNerabyGymsUseCase

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNerabyGymsUseCase(gymsRepository)
  })
  it('should be able fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'gym-01',
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      latitude: -27.0610928,
      longitude: -49.5229501,
    })

    const { gyms } = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'gym-01' })])
  })
})
