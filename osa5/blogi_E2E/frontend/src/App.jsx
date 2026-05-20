import { useState, useEffect, useRef } from 'react'
import Footer from './components/Footer'
import Blog from './components/Blog'
import NotificationE from './components/NotificationE'
import NotificationS from './components/NotificationS'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/notes'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

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


  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat({
          id: returnedBlog.id,
          user: user,
          title: returnedBlog.title,
          author: returnedBlog.author,
          url: returnedBlog.url,
          likes: returnedBlog.likes
        }))

        setSuccessMessage('successfully added blog ' + returnedBlog.title + ' by ' + returnedBlog.author)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
  }

  const rmAppBlog = (id) => {
    blogService
      .rmServBlog(id)
      .then(() => {
        setBlogs(blogs.filter(blog => blog.id !== id))
        setSuccessMessage('blog removed')
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
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

    // eslint-disable-next-line no-unused-vars
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleLogin={handleLogin}
      />
    </Togglable>
  )


  return (
    <div>
      <h1>Blogs</h1>
      <NotificationE message={errorMessage} />
      <NotificationS message={successMessage} />

      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in
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

          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>


          {blogs.sort(function(a, b) {return b.likes - a.likes})
            .map(blog =>
              <Blog key={blog.id} blog={blog} user={user} rmAppBlog={rmAppBlog} handleLikes={handleLikes} />
            )}
        </div>
      )}

      <Footer />
    </div>
  )
}

export default App