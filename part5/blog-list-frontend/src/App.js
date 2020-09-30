import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    const user = await loginService.login({
      username, password
    })
    window.localStorage.setItem(
      'loggedOnUser', JSON.stringify(user)
    )
    setUser(user)
    console.log(user)
    setUsername('')
    setPassword('')
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedOnUser')
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

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

      <p>{user.name} logged in</p>

      <button onClick={() => logOut()}>Log out</button>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>)
}

export default App
