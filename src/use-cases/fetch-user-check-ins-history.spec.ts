import { CheckinsRepository } from '@/repositories/checkins-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'
import { InMemoryCheckinsRepository } from '@/repositories/in-memory/in-memory-checkins-repository'

describe('Fetch user check-ins history use case', () => {
  let checkInsRepository: CheckinsRepository
  let sut: FetchUserCheckInsHistoryUseCase

  beforeEach(() => {
    checkInsRepository = new InMemoryCheckinsRepository()
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository)
  })
  it('should be able to fetch check-in history', async () => {
    checkInsRepository.create({ user_id: 'user-01', gym_id: 'gym-01' })
    checkInsRepository.create({ user_id: 'user-01', gym_id: 'gym-02' })
    const { checkIns } = await sut.execute({ userId: 'user-01', page: 1 })
    expect(checkIns.length).toEqual(2)
    expect(checkIns[0].gym_id).toEqual('gym-01')
    expect(checkIns[1].gym_id).toEqual('gym-02')
  })
  it('should be able to fetch paginated check-in history', async () => {
    for (let i = 0; i <= 22; i++) {
      checkInsRepository.create({ user_id: 'user-01', gym_id: 'gym-' + i })
    }
    const { checkIns } = await sut.execute({ userId: 'user-01', page: 2 })
    expect(checkIns.length).toEqual(3)
    expect(checkIns[0]).toMatchObject({ user_id: 'user-01', gym_id: 'gym-20' })
  })
})
