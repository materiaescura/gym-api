import { Checkin, Prisma } from '@prisma/client'

export interface CheckinsRepository {
  create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin>
  findByUserIdOnDate(userId: string, date: Date): Promise<Checkin | null>
  findById(checkInId: string): Promise<Checkin | null>
  findManyByUserId(userId: string, page: number): Promise<Checkin[]>
  countByUserId(userId: string): Promise<number>
  save(checkIn: Checkin): Promise<Checkin>
}
