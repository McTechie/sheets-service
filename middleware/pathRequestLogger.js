const pathRequestLogger = (req, res, next) => {
  console.log({
    req_method: req.method,
    path: req.path,
  })
  next()
}

module.exports = pathRequestLogger
