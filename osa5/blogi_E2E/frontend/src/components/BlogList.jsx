import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Footer from './Footer'
import NotificationE from './NotificationE'
import NotificationS from './NotificationS'
import LoginForm from './LoginForm'
import Togglable from './Togglable'
import loginService from '../services/login'
import blogService from '../services/notes'

const BlogList = ({ blogs, errorMessage, successMessage }) => {
  const blogFormRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <h1>Blogs</h1>
      <NotificationE message={errorMessage} />
      <NotificationS message={successMessage} />
      {blogs.sort(function (a, b) { return b.likes - a.likes })
        .map(blog => 
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title} - {blog.author}</Link>
          </li>
      )}
    </div>
  )
}

export default BlogList