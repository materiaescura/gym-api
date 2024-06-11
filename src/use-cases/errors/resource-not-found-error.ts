export class ResourceNotFoundError extends Error {
  public name = 'ResourceNotFoundError'
  constructor() {
    super('Resource not found.')
  }
}
