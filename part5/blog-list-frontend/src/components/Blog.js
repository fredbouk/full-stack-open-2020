import React, { useState } from 'react'

const Blog = ({ blog, increaseLike, loggedOnUser, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const increaseByOne = () => {
    increaseLike(blog.id, { likes: blog.likes + 1 })
  }

  const deleteButton = () => {
    if (blog.user.username === loggedOnUser.username) {
      return <button onClick={() => { deleteBlog(blog) }}>delete</button>
    }
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} by {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.title} by {blog.author} <button onClick={toggleVisibility}>hide</button></p>
        <p>{blog.url}</p>
        <p>{blog.likes} <button onClick={increaseByOne}>like</button></p>
        <p>{blog.user.name}</p>
        {deleteButton()}
      </div>
    </div>
  )
}

export default Blog
