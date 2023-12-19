import React from 'react'
import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getBlogs()
      console.log(blogs)
      setBlogs(blogs)
    }

    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedPhonebookappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedPhonebookappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const Notification = () => {
    if (errorMessage === null) {
      return null
    }

    if (errorMessage) {
      return (
        <div className='error'>
          {errorMessage}
        </div>
      )
    }
  }

  const updateLikesOf = (id) => {
    let blog
    blog = blogs.find((blog) => {return (blog.id === id)})
    if (blog.user) {
      blog = { ...blog, user: blog.user.id }
    }
    const increaseLikes = { ...blog, likes: blog.likes + 1 }

    blogService
      .updateLikes(id, increaseLikes)
      .then(returnedBlog => {
        setBlogs(blogs.map((blog) => {return blog.id !== id ? blog : returnedBlog}))
      })
      .catch(() => {
        setErrorMessage(`the blog ${blog.title} was already deleted from server`)
        setTimeout(() => {setErrorMessage(null)}, 5000)
        setBlogs(blogs.filter(n => n.id !== id))
      })
  }

  const handleRemoveOf = (blogId) => {
    let blog
    blog = blogs.find((blog) => {return (blog.id === blogId)})
    if (confirm(`Are you sure you want to delete blog ${blog.title} by ${blog.author}?`)) {
      blogService
        .deleteBlog(blogId)
        .then(() => {
          setBlogs(blogs.filter(n => n.id !== blogId))
        })
        .catch((error) => {
          setErrorMessage(`${error}`)
          setTimeout(() => {setErrorMessage(null)}, 5000)
        })
    }
  }

  if (user === null) {
    return (
      <div>
        <h1>blogs</h1>
        { errorMessage && Notification() }
        { LoginForm({ handleLogin, username, password, setUsername, setPassword }) }
      </div>
    )
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedPhonebookappUser')
    setUser(null)
    location.reload()
  }

  const compareLikesBlogs = (a, b) => {
    return b.likes - a.likes
  }

  return (
    <div>
      <h2>blogs</h2>

      <div style={{ marginBottom: '1.5rem' }}>
        {user ? `${user.username} logged in` : ''}
        <button className="siteButton" onClick={handleLogout}>Log out</button>
      </div>

      { errorMessage && Notification() }

      <BlogForm setErrorMessage={setErrorMessage} setBlogs={setBlogs} blogs={blogs}/>

      { !user && LoginForm({ handleLogin, username, password, setUsername, setPassword }) }
      {blogs.sort(compareLikesBlogs).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateLikes={() => updateLikesOf(blog.id)}
          handleRemove={() => handleRemoveOf(blog.id)}
          currentUser={user.username}
        />
      )}
    </div>
  )
}

export default App
