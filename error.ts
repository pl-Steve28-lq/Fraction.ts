class ZeroDivisionError extends Error {
  constructor() { super("division by zero") }
}
class FractionError extends Error {}

export { ZeroDivisionError, FractionError }