const AdminMiddleware = (req, res, next) => {
  const token = 'xyz'

  if (token !== 'xyz') {
    res.status(401).send('Unauthorized Credentials')
  } else {
    next()
  }
}

module.exports = { AdminMiddleware }
