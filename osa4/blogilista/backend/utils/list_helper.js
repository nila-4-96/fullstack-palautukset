const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (max, item) => {
    if (item.likes > max.likes) {
      return item
    } else {
      return max
    }
  }
  return {
    title: blogs.reduce(reducer).title,
    author: blogs.reduce(reducer).author,
    url: blogs.reduce(reducer).url,
    likes: blogs.reduce(reducer).likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}