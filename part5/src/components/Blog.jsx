import React from 'react'
import { useState } from 'react'

const Blog = ({ blog, updateLikes, handleRemove, currentUser }) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const toggleVisibility = () => {
    setBlogVisible(!blogVisible)
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
        ? <button data-testid="view" className="siteButton view" onClick={toggleVisibility}>view</button>
        : <button data-testid="hide" className="siteButton" onClick={toggleVisibility}>hide</button>}
      {blogVisible &&
        <div className='testDiv'>
          <a href={blog.url} data-testid='url'>{blog.url}</a>
          <p style={textStyle} data-testid='likes'>likes {blog.likes} <button data-testid="likeButton" style={textStyle} className="siteButton" onClick={updateLikes}>like</button></p>
          {blog.user ? <p style={textStyle}>{blog.user.name}</p> : null }
          {!blog.user && removeButton()}
          {(blog.user && blog.user.username === currentUser) && removeButton()}
        </div>
      }
    </div>
  )
}

export default Blog