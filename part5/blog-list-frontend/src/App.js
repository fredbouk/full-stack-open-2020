import React, { useState, useEffect, useRef } from 'react'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')
  const [errorNotification, setErrorNotification] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedOnUserJSON = window.localStorage.getItem('loggedOnUser')
    if (loggedOnUserJSON) {
      const user = JSON.parse(loggedOnUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedOnUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorNotification('Wrong username or password')
      setTimeout(() => {
        setErrorNotification('')
      }, 4000
      )
    }
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const blog = await blogService.create(blogObject)
    setBlogs(blogs.concat(blog))
    setNotification(`A new blog: ${blog.title} by ${blog.author} added`)
    setTimeout(() => {
      setNotification('')
    }, 4000)
  }

  const increaseLike = async (id, likeObject) => {
    const updatedBlog = await blogService.update(id, likeObject)
    setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog))
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedOnUser')
    setUser(null)
  }

  const blogForm = () => (
    <Togglable buttonLabel='Create blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        <ErrorNotification message={errorNotification} />

        <form onSubmit={handleLogin}>
          <div>
          username
            <input
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
          password
            <input
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>

      <Notification message={notification} />

      <p>{user.name} logged in</p>

      <button onClick={() => logOut()}>Log out</button>

      {blogForm()}

      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} increaseLike={increaseLike} />
      )}
    </div>
  )
}

export default App
