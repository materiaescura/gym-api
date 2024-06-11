import { Gym, Prisma } from '@prisma/client'

export interface FindManyNearby {
  userLatitude: number
  userLongitude: number
}

export interface GymsRepository {
  create(gym: Prisma.GymCreateInput): Promise<Gym>
  findById(gymId: string): Promise<Gym | null>
  searchMany(query: string, page: number): Promise<Gym[]>
  findManyNearby(params: FindManyNearby): Promise<Gym[]>
}
