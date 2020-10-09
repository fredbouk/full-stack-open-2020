import React from 'react'

const BlogForm = ({ handleCreate, handleTitleChange, handleAuthorChange, handleUrlChange, title, author, url }) => {
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleCreate}>
        <div>
      Title:
          <input
            type='text'
            value={title}
            name='Title'
            onChange={handleTitleChange}
          />
        </div>
        <div>
      Author:
          <input
            type='text'
            value={author}
            name='Author'
            onChange={handleAuthorChange}
          />
        </div>
        <div>
      Url:
          <input
            type='text'
            value={url}
            name='Url'
            onChange={handleUrlChange}
          />
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default BlogForm
