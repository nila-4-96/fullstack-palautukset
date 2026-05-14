import { useState, useEffect } from 'react'
import Footer from './components/Footer'
import Blog from './components/Blog'
import NotificationE from './components/NotificationE'
import NotificationS from './components/NotificationS'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/notes'
import loginService from './services/login'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = event => {
    try {
      event.preventDefault()
      const blogObject = {
        title: title,
        author: author,
        url: url,
        likes: 0
      }

      blogService.create(blogObject).then(returnedBlog => {
        setSuccessMessage('a new blog ' + title + ' by ' + author + ' added')
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)

        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
      })

    // eslint-disable-next-line no-unused-vars
    } catch (exception) {
      setErrorMessage('adding a blog failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
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

    // eslint-disable-next-line no-unused-vars
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleTitleChange = event => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = event => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = event => {
    setUrl(event.target.value)
  }

  // const blogsToShow = showAll


  return (
    <div>
      <h1>Blogs</h1>
      <NotificationE message={errorMessage} />
      <NotificationS message={successMessage} />

      {!user && <LoginForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword} />}
      {user && (
        <div>
          <p>

          {user.name} logged in

          <button onClick={() => {
            window.localStorage.removeItem(
              'loggedBlogappUser'
            )
            setUser(null)
            
            setSuccessMessage('logged out')
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          }}>logout</button>

          </p>

          <BlogForm addBlog={addBlog} title={title} author={author} url={url} handleTitleChange={handleTitleChange} handleAuthorChange={handleAuthorChange} handleUrlChange={handleUrlChange} />
          {blogs.map(blog => 
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      )}

      <Footer />
    </div>
  )

}

export default App