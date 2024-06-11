import { Checkin, Prisma } from '@prisma/client'
import { CheckinsRepository } from '../checkins-repository'
import { randomUUID } from 'crypto'

export class InMemoryCheckinsRepository implements CheckinsRepository {
  public checkins: Checkin[] = []
  async create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin> {
    const date = new Date()

    const checkin: Checkin = {
      id: data.id ?? randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      created_at: date,
      validated_at: null,
    }

    this.checkins.push(checkin)
    return checkin
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date
  ): Promise<Checkin | null> {
    const checkin = this.checkins.find((checkin) => {
      return (
        checkin.user_id === userId &&
        checkin.created_at.toDateString() === date.toDateString()
      )
    })

    if (!checkin) return null

    return checkin
  }

  async findById(checkInId: string): Promise<Checkin | null> {
    const checkIn = this.checkins.find((checkIn) => checkIn.id === checkInId)
    return checkIn ? checkIn : null
  }

  async findManyByUserId(userId: string, page: number): Promise<Checkin[]> {
    const checkins = this.checkins
      .filter((checkIn) => checkIn.user_id === userId)
      .slice((page - 1) * 20, page * 20)
    return checkins
  }

  async countByUserId(userId: string): Promise<number> {
    const checkIns = this.checkins.filter(
      (checkIn) => checkIn.user_id === userId
    )
    return checkIns.length
  }

  async save(checkIn: Checkin): Promise<Checkin> {
    const { id } = checkIn
    const index = this.checkins.findIndex((checkIn) => checkIn.id === id)
    this.checkins[index] = checkIn
    return checkIn
  }
}
