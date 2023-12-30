import React from 'react'
import { useParams } from 'react-router-dom'

const UserView = ({ users }) => {
  const id = useParams().id
  const userToView = users.find(user => user.id === id)

  if (!userToView) {
    return null
  }

  return (
    <div>
      <h2>{userToView.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {userToView.blogs.map(blog =>
          <li key={blog.id}>
            {blog.title}
          </li>)}
      </ul>
    </div>
  )
}

export default UserView