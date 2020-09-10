/* eslint-env jest */

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initiaBlogs = [
  {
    title: 'Blog 1',
    author: 'Blogger 1',
    url: 'www.testblog1.blogspot.com',
    likes: 10
  },
  {
    title: 'Blog 2',
    author: 'Blogger 2',
    url: 'www.testblog2.blogspot.com',
    likes: 1000
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initiaBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initiaBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initiaBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})
