export class UserAlreadyExistsError extends Error {
  public name = 'UserAlreadyExists'
  constructor() {
    super('User already exists.')
  }
}
