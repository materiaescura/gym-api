import { CheckinsRepository } from '@/repositories/checkins-repository'
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { CheckinUseCase } from './checkin'
import { InMemoryCheckinsRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
import { GymsRepository } from '@/repositories/gyms-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { MaxDistanceError } from './errors/max-distance-error'

describe('Checkin use case', () => {
  let checkinsRepository: CheckinsRepository
  let gymsRepository: GymsRepository
  let checkinUseCase: CheckinUseCase

  beforeEach(() => {
    checkinsRepository = new InMemoryCheckinsRepository()
    gymsRepository = new InMemoryGymsRepository()
    gymsRepository.create({
      id: 'gym_id',
      title: 'title',
      latitude: -27.2092052,
      longitude: -49.6401091,
    })
    checkinUseCase = new CheckinUseCase(checkinsRepository, gymsRepository)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })
  it('should be able to check in', async () => {
    const checkinData = {
      userId: 'user_id',
      gymId: 'gym_id',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    }

    const { checkin } = await checkinUseCase.execute(checkinData)
    expect(checkin.user_id).toEqual(checkinData.userId)
    expect(checkin.gym_id).toEqual(checkinData.gymId)
    expect(checkin.created_at).toBeInstanceOf(Date)
  })
  it('should not be able two check in same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    const checkinData = {
      userId: 'user_id',
      gymId: 'gym_id',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    }

    await checkinUseCase.execute(checkinData)
    await expect(() =>
      checkinUseCase.execute(checkinData)
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    const checkinData = {
      userId: 'user_id',
      gymId: 'gym_id',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    }

    await checkinUseCase.execute(checkinData)

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkin } = await checkinUseCase.execute(checkinData)
    expect(checkin.id).toEqual(expect.any(String))
    expect(checkin.created_at.toDateString()).toEqual(
      new Date(2022, 0, 21, 0, 0).toDateString()
    )
  })

  it('should not be able to check in on distance gym', async () => {
    gymsRepository.create({
      id: 'gym_far',
      title: 'title',
      latitude: -27.2092052,
      longitude: -49.4889672,
    })
    const checkinData = {
      userId: 'user_id',
      gymId: 'gym_far',
      userLatitude: -27.0747279,
      userLongitude: -49.6401091,
    }

    await expect(() =>
      checkinUseCase.execute(checkinData)
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
