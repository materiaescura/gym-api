import { CheckinsRepository } from '@/repositories/checkins-repository'

interface GetUserMetricsUseCaseRequest {
  userId: string
}

interface GetUserMetricsUseCaseResponse {
  count: number
}

export class GetUserMetricsUseCase {
  constructor(private checkInsRepository: CheckinsRepository) {}
  async execute({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const count = await this.checkInsRepository.countByUserId(userId)
    return {
      count,
    }
  }
}
