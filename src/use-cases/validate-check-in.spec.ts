import { InMemoryCheckinsRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ValidateCheckInUseCase } from './validate-check-in'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'
import { CheckinsRepository } from '@/repositories/checkins-repository'

describe('Validate check in use case', () => {
  let checkInsRepository: CheckinsRepository
  let sut: ValidateCheckInUseCase

  beforeEach(async () => {
    vi.useFakeTimers()
    checkInsRepository = new InMemoryCheckinsRepository()
    sut = new ValidateCheckInUseCase(checkInsRepository)

    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await checkInsRepository.create({
      id: 'id',
      gym_id: 'gym_id',
      user_id: 'user_id',
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('shoud be able validate check in', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 20, 0))

    const { checkIn } = await sut.execute({ checkInId: 'id' })
    expect(checkIn.id).toEqual('id')
    expect(checkIn.validated_at?.getFullYear()).toEqual(2022)
    expect(checkIn.validated_at?.getMonth()).toEqual(0)
    expect(checkIn.validated_at?.getDate()).toEqual(20)
  })

  it('shoud not be able validate check in before 20 minutes', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 21, 0))

    await expect(() => sut.execute({ checkInId: 'id' })).rejects.toBeInstanceOf(
      LateCheckInValidationError
    )
  })
})
