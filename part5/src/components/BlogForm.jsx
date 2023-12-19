import React from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable'
import { useState, useRef } from 'react'

const NewBlogForm = ({ setErrorMessage, setBlogs, blogs }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)

  const handleNewBlogSubmit = async (event) => {
    event.preventDefault()
    toggleRef.current.toggleVisibility()
    try {
      const newBlog = await blogService.create({
        title, author, url
      })
      setBlogs([...blogs, newBlog])
      setTitle('')
      setAuthor('')
      setUrl('')
      setSuccessMessage(`a new blog ${title} by ${author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

    } catch(error) {
      setErrorMessage('Cannot make post')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const toggleRef = useRef()

  const Notification = () => {
    if (successMessage === null) {
      return null
    }

    if (successMessage) {
      return (
        <div className='success'>
          {successMessage}
        </div>
      )
    }
  }

  return (
    <Togglable buttonLabel={'create new blog'} ref={toggleRef}>
      <div>
        <h2>create new</h2>
        { successMessage && Notification() }
        <form onSubmit={handleNewBlogSubmit}>
          <div>
            title:
            <input
              type="text"
              value={title}
              onChange={({ target }) => {setTitle(target.value)}}
              name="title"
              data-testid="title"
            ></input>
          </div>
          <div>
            author:
            <input
              type="text"
              value={author}
              onChange={({ target }) => {setAuthor(target.value)}}
              name="author"
              data-testid="author"
            ></input>
          </div>
          <div>
            url:
            <input
              type="text"
              value={url}
              onChange={({ target }) => {setUrl(target.value)}}
              name="url"
              data-testid="url"
            ></input>
          </div>
          <div>
            <button id="submitButton" data-testid="submitButton" style={{ marginLeft:'0' }} className="siteButton" type="submit">create</button>
          </div>
        </form>
      </div>
    </Togglable>
  )
}

export default NewBlogForm