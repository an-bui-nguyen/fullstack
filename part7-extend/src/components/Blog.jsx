import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateLikes, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog, currentUser }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const dispatch = useDispatch()

  const toggleVisibility = () => {
    setBlogVisible(!blogVisible)
  }

  const handleLike = () => {
    if (blog.user) {
      blog = { ...blog, user: blog.user.id }
    }

    try {
      dispatch(updateLikes(blog))
    } catch (error) {
      dispatch(setNotification('error', 'cannot like blog', 5))
    }
  }

  const handleRemove = () => {
    if (blog.user) {
      blog = { ...blog, user: blog.user.id }
    }
    if (confirm(`Are you sure you want to delete blog ${blog.title} by ${blog.author}?`)) {
      try {
        dispatch(deleteBlog(blog.id))
      } catch (error) {
        dispatch(setNotification('error', `${error}`))
      }
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const textStyle = {
    marginTop: 0,
    marginBottom: 0
  }

  const removeButton = () => {
    return (
      <button className="siteButton removeButton" onClick={handleRemove}>remove</button>
    )
  }

  return (
    <div style={blogStyle} className='blogDiv'>
      <em>{blog.title}</em> by {blog.author}
      {!blogVisible
        ? <button
          data-testid="view"
          className="siteButton view"
          onClick={toggleVisibility}>
            view
        </button>
        : <button data-testid="hide" className="siteButton" onClick={toggleVisibility}>hide</button>}
      {blogVisible &&
        <div className='testDiv'>
          <a href={blog.url} data-testid='url'>{blog.url}</a>
          <p
            style={textStyle}
            data-testid='likes'>likes {blog.likes}
            <button data-testid="likeButton" style={textStyle} className="siteButton" onClick={handleLike}>like</button>
          </p>
          {blog.user ? <p style={textStyle}>{blog.user.name}</p> : null }
          {!blog.user && removeButton()}
          {(blog.user && blog.user.username === currentUser) && removeButton()}
        </div>
      }
    </div>
  )
}

export default Blog