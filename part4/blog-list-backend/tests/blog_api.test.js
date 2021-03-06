/* eslint-env jest */

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Blog 1',
    author: 'Blogger 1',
    url: 'www.testblog1.blogspot.com',
    likes: 10000
  },
  {
    title: 'Blog 2',
    author: 'Blogger 2',
    url: 'www.testblog2.blogspot.com',
    likes: 1000
  }
]

const createUser = async () => {
  const newUser = {
    name: 'Arto Hellas',
    username: 'ahellas',
    password: 'sekret'
  }

  await api
    .post('/api/users')
    .send(newUser)

  const loggedInUser = await api
    .post('/api/login')
    .send({
      username: newUser.username,
      password: newUser.password
    })
  return loggedInUser
}

let user

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  user = await createUser()

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${user.body.token}`)
    .send(initialBlogs[0])

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${user.body.token}`)
    .send(initialBlogs[1])
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('the unique identifier property of a blog post is named id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('a HTTP POST request to the /api/blogs url successfully creates a new blog post', async () => {
  const newBlog = {
    title: 'NEW BLOG!',
    author: 'Blogger 3',
    url: 'www.newblog.blogspot.com',
    likes: 1000000000000
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${user.body.token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(blog => blog.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(titles).toContain('NEW BLOG!')
})

test('a HTTP POST request to the /api/blogs url fails if a token is not provided.', async () => {
  const newBlog = {
    title: 'Tokens!',
    author: 'Tor',
    url: 'www.tk.blogspot.com',
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)
})

test('if the likes property is missing from a request, it will default to the value 0', async () => {
  const newBlog = {
    title: 'ANOTHER NEW BLOG!',
    author: 'Blogger 4',
    url: 'www.anothernewblog.blogspot.com'
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${user.body.token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  // gets the added blog
  expect(response.body[initialBlogs.length].likes).toBe(0)
})

test('if the title and url properties are missing, the backend responds with status code 400', async () => {
  const newBlog = {
    author: 'Blogger 5',
    url: 'www.titleless.blogspot.com',
    likes: 2
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${user.body.token}`)
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

describe('Deletion of a blog', () => {
  test('succeeds with status code 204', async () => {
    const response = await api.get('/api/blogs')
    const blogToDelete = response.body[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${user.body.token}`)
      .expect(204)

    const blogsAtEnd = await api.get('/api/blogs')

    expect(blogsAtEnd.body).toHaveLength(
      initialBlogs.length - 1
    )
  })
})

test('updating the amout of likes for a blog works ok', async () => {
  const response = await api.get('/api/blogs')
  const blogToUpdate = response.body[0]

  const updatedBlog = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send({ likes: 1 })

  expect(updatedBlog.body.likes).toBe(1)
})

afterAll(() => {
  mongoose.connection.close()
})
