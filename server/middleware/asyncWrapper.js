const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next)
    } catch (error) {
      next(`Error: ${error.message}`)
    }
  }
}

module.exports = asyncWrapper