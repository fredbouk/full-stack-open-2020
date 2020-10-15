const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const User = require('../models/user')

const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (!request.token) {
    return response.status(401).json({ error: 'token is missing' })
  }

  let decodedToken

  try {
    decodedToken = jwt.verify(request.token, process.env.SECRET)
  } catch (err) {
    return response.status(401).json({ error: 'token is invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  if (blog.likes === undefined) {
    blog.likes = 0
  }

  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    const savedBlogPopulated = await Blog.findById(savedBlog._id).populate('user', { username: 1, name: 1, id: 1 })
    response.status(201).json(savedBlogPopulated)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  if (!request.token) {
    return response.status(401).json({ error: 'token is missing' })
  }

  let decodedToken

  try {
    decodedToken = jwt.verify(request.token, process.env.SECRET)
  } catch (err) {
    return response.status(401).json({ error: 'token is invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === user._id.toString()) {
    try {
      await Blog.findByIdAndRemove(request.params.id)
      user.blogs = user.blogs.filter(blog => blog._id.toString() !== request.params.id) // removes the blog from users blogs array
      await user.save()
      response.status(204).end()
    } catch (error) {
      next(error)
    }
  } else { return response.status(401).json({ error: 'unauthorized user' }) }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    likes: body.likes
  }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', { username: 1, name: 1, id: 1 })
    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
