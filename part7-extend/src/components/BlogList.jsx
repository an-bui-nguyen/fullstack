import React from 'react'
import Blog from './Blog'

const BlogList = ({ user, blogs }) => {
  return (
    <div>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          currentUser={user.username}
        />
      )}
    </div>
  )
}

export default BlogList