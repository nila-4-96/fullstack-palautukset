import { useState } from 'react'
import blogService from '../services/notes'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const incLike = () => {
    console.log('like')
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes + 1
    }

    blogService.update(blog.id, updatedBlog)
      .then(() => setLikes(likes + 1))
  }

  return (
    <div style={blogStyle}>
      <div>
      {blog.title} - {blog.author}
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        <button onClick={toggleVisibility}>hide</button>
      </div>
      </div>
      {visible && (
        <div>
          <div>
          {blog.url}
          </div>
          <div>
          likes {likes}
          <button onClick={incLike}>like</button>
          </div>
          <div>
          user {blog.user.name}
          </div>
        </div>
      )}
    </div>
  )
}

export default Blog