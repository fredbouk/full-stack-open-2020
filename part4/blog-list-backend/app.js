const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const errorHandler = require('./utils/error-handler')
const blogsRouter = require('./controllers/blogs')

const mongoUrl = config.mongoUrl
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use(errorHandler)

module.exports = app
