export class InvalidCredentialsError extends Error {
  public name = 'InvalidCredentialsError'
  constructor() {
    super('Invalid credentials.')
  }
}
