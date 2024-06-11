import { CheckinsRepository } from '@/repositories/checkins-repository'
import { Checkin } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import dayjs from 'dayjs'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}

interface ValidateCheckInUseCaseResponse {
  checkIn: Checkin
}

export class ValidateCheckInUseCase {
  constructor(private checkinsRepository: CheckinsRepository) {}
  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkinsRepository.findById(checkInId)
    if (!checkIn) throw new ResourceNotFoundError()

    const date = new Date()
    const distanceInMinutesFromCheckInCreation = dayjs(date).diff(
      checkIn.created_at,
      'minutes'
    )

    if (distanceInMinutesFromCheckInCreation > 20)
      throw new LateCheckInValidationError()

    checkIn.validated_at = new Date()
    await this.checkinsRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
