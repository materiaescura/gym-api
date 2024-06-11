import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface FetchNerabyGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNerabyGymsUseCaseResponse {
  gyms: Gym[]
}

export class FetchNerabyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNerabyGymsUseCaseRequest): Promise<FetchNerabyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      userLatitude,
      userLongitude,
    })

    return {
      gyms,
    }
  }
}
