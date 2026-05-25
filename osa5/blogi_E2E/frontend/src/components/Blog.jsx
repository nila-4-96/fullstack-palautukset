import { useParams, useNavigate } from 'react-router-dom'

const Blog = ({ blog, user, deleteBlog, handleLikes }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const id = useParams().id
  const navigate = useNavigate()

  if(!blog) {
    return null
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(id)
      navigate('/blogs')
    }
  }

  // {console.log('blog.user.username:', blog.user.username)}
  // {console.log('logged user:', JSON.parse(window.localStorage.getItem('loggedBlogappUser')).username)}

  return (
    <li className='blog'>
      <div style={blogStyle}>
        <div>{blog.title} - {blog.author}</div>
        <div>{blog.url}</div>
        <div>likes {blog.likes} {blog.user && user && (
          <button onClick={() => handleLikes(blog)}>like</button>
        )}</div>
        <div>user {blog.user.name}</div>
        <div>{blog.user && user && blog.user.username === user.username && (
          <button onClick={handleDelete}>remove</button>
        )}</div>
      </div>
    </li>
  )
}

export default Blog