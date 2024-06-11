export class MaxDistanceError extends Error {
  public name = 'MaxDistanceError'
  constructor() {
    super('Max distance reached.')
  }
}
