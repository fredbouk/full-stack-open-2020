require('dotenv').config()

const PORT = process.env.PORT
let mongoUrl = process.env.mongoUrl

if (process.env.NODE_ENV === 'test') {
  mongoUrl = process.env.TEST_mongoUrl
}

module.exports = {
  PORT,
  mongoUrl
}
