import { useState } from 'react'
import blogService from '../services/notes'

const Blog = ({ blog, user, rmAppBlog, handleLikes }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }


  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      rmAppBlog(blog.id)
    }
  }

  // {console.log('blog.user.username:', blog.user.username)}
  // {console.log('logged user:', JSON.parse(window.localStorage.getItem('loggedBlogappUser')).username)}

  return (
    <li className='blog'>
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
            likes {blog.likes}
              <button onClick={() => handleLikes(blog)}>like</button>
            </div>
            <div>
            user {blog.user.name}
            </div>
            {blog.user.username === user.username && (
              <div>
                <button onClick={removeBlog}>remove</button>
              </div>
            )}
          </div>
        )}
      </div>
    </li>
  )
}

export default Blog