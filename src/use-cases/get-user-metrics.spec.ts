import { CheckinsRepository } from '@/repositories/checkins-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { GetUserMetricsUseCase } from './get-user-metrics'
import { InMemoryCheckinsRepository } from '@/repositories/in-memory/in-memory-checkins-repository'

describe('Get user metrics use case', () => {
  let checkInsRepository: CheckinsRepository
  let sut: GetUserMetricsUseCase
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckinsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)
  })
  it('should be able to get user metrics', async () => {
    checkInsRepository.create({ user_id: 'user-01', gym_id: 'gym-01' })
    checkInsRepository.create({ user_id: 'user-02', gym_id: 'gym-01' })
    checkInsRepository.create({ user_id: 'user-01', gym_id: 'gym-02' })

    const { count } = await sut.execute({ userId: 'user-01' })

    expect(count).toEqual(2)
  })
})
