const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
  // Sort the blogs in the array by likes in descending order and select the blog with highest likes:
  const favourite = blogs.sort((a, b) => b.likes - a.likes)[0]

  return {
    title: favourite.title,
    author: favourite.author,
    likes: favourite.likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}
