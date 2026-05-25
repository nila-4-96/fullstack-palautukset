import { useState, useEffect, useRef } from 'react'
import blogService from './services/notes'
import loginService from './services/login'

import {
  Routes, Route, Link, useMatch, useNavigate
} from 'react-router-dom'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import Home from './components/Home'
import Footer from './components/Footer'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs)
    })
  }, [])

  const addBlog = (blogObject) => {
    // blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(
          returnedBlog
        ))
/*
        setSuccessMessage('successfully added blog ' + returnedBlog.title + ' by ' + returnedBlog.author)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
        */
      })
  }

  const deleteBlog = (id) => {
    blogService.rmServBlog(id).then(() => {
      setBlogs(blogs.filter(b => b.id !== id))
    })
  }

  const handleLikes = (blog) => {
    blogService
      .update(blog.id, {
        user: {
          username: blog.user.username,
          name: blog.user.name,
          id: blog.user.id
        },
        id: blog.id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1
      })
      .then(updatedBlog => {
        console.log('updatedBlog:', updatedBlog)
        setBlogs(blogs.map(newBlog => (newBlog.id !== blog.id ? newBlog : {
          id: updatedBlog.id,
          user: blog.user,
          title: updatedBlog.title,
          author: updatedBlog.author,
          url: updatedBlog.url,
          likes: updatedBlog.likes
        })))
      })
  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      setSuccessMessage('successfully logged in, ' + user.name)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      navigate('/blogs')

    // eslint-disable-next-line no-unused-vars
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const padding = {
    padding: 5
  }

  const match = useMatch('/blogs/:id')
  const blog = match 
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  // console.log('blog:', blog)

  return (
    <div>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/blogs">blogs</Link>
        {user && (
          <Link style={padding} to="/create">new blog</Link>
        )}
        {!user && (
          <Link style={padding} to="/login">login</Link>
        )}
        {user && (
          <button onClick={() => {
            setUser(null)
            blogService.setToken(null)
            window.localStorage.removeItem('loggedBlogappUser')
            setSuccessMessage('successfully logged out')
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
            navigate('/blogs')
          }}>logout</button>
        )}
      </div>

      <Routes>
        <Route path="/blogs/:id" element={
          <Blog 
            blog={blog}
            deleteBlog={deleteBlog}
            handleLikes={handleLikes}
            user={user}
          />
        } />
        <Route path="/blogs" element={
          <BlogList blogs={blogs} errorMessage={errorMessage} successMessage={successMessage} />
        } />
        <Route path="/create" element={
          <BlogForm createBlog={addBlog} />
        } />
        <Route path="/login" element={
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin}
          />
        } />
        <Route path="/" element={<Home />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App