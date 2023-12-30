import React from 'react'
import Togglable from './Togglable'
import useField from '../hooks'
import { useRef } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const NewBlogForm = () => {
  const { resetValue: resetTitle, ...title } = useField('text')
  const { resetValue: resetAuthor, ...author } = useField('text')
  const { resetValue: resetUrl, ...url } = useField('text')

  const dispatch = useDispatch()

  const handleNewBlogSubmit = async (event) => {
    event.preventDefault()
    toggleRef.current.toggleVisibility()
    try {
      dispatch(createBlog({ title: title.value, author:author.value, url:url.value }))
      resetTitle()
      resetAuthor()
      resetUrl()
      dispatch(setNotification('success', `a new blog ${title.value} by ${author.value} added`, 5))

    } catch(error) {
      dispatch(setNotification('error', 'Cannot make post', 5))
    }
  }

  const toggleRef = useRef()

  return (
    <Togglable buttonLabel={'create new blog'} ref={toggleRef}>
      <div>
        <h2>create new</h2>
        <form onSubmit={handleNewBlogSubmit}>
          <div>
            title:
            <input
              {...title}
              data-testid="title"
            ></input>
          </div>
          <div>
            author:
            <input
              {...author}
              data-testid="author"
            ></input>
          </div>
          <div>
            url:
            <input
              {...url}
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