import { Prisma, Gym } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { FindManyNearby, GymsRepository } from '../gyms-repository'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

export class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = []

  async create(gymData: Prisma.GymCreateInput): Promise<Gym> {
    const gym: Gym = {
      ...gymData,
      id: gymData.id ?? randomUUID(),
      description: gymData.description ?? null,
      phone: gymData.phone ?? null,
      latitude: new Prisma.Decimal(gymData.latitude.toString()),
      longitude: new Prisma.Decimal(gymData.longitude.toString()),
    }
    this.gyms.push(gym)
    return gym
  }

  async findById(gymId: string): Promise<Gym | null> {
    const gym = this.gyms.find((gym) => {
      return gym.id === gymId
    })
    return gym ? gym : null
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    const gyms = this.gyms
      .filter((gym) => gym.title.includes(query))
      .slice((page - 1) * 20, page * 20)
    return gyms
  }

  async findManyNearby(params: FindManyNearby): Promise<Gym[]> {
    const gyms = this.gyms.filter((gym) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.userLatitude, longitude: params.userLongitude },
        {
          latitude: gym.latitude.toNumber(),
          longitude: gym.longitude.toNumber(),
        }
      )

      return distance < 10
    })

    return gyms
  }
}
