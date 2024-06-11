export class MaxNumberOfCheckInsError extends Error {
  public name = 'MaxNumberOfCheckInsError'
  constructor() {
    super('Max number of check-ins reached.')
  }
}
