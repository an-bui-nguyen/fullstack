import React, { useEffect } from 'react'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import UserTable from './components/UserTable'
import UserView from './components/UserView'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { getAllUsers } from './reducers/userReducer'
import { getUserFromLocalStorage, setUser } from './reducers/authReducer'
import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route,
  useMatch
} from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.auth)
  const users = useSelector(state => state.users)
  console.log(users)

  const match = useMatch('/users/:id')

  const userToView = match
    ? users.find(user => user.id === Number(match.params.id))
    : null

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])


  useEffect(() => {
    dispatch(getUserFromLocalStorage())
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedPhonebookappUser')
    dispatch(setUser(null))
    location.reload()
  }

  const padding = {
    paddingLeft: 5,
    paddingRight: 5
  }

  if (user) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />

        <div style={{ marginBottom: '1.5rem' }}>
          {user ? `${user.username} logged in` : ''}
          <button className="siteButton" onClick={handleLogout}>Log out</button>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <Link style={padding} to='/'>blogs</Link>
          <Link style={padding} to='/users'>users</Link>
        </div>

        <BlogForm />

        <Routes>
          <Route path='/' element={<BlogList user={user} blogs={blogs}/>}/>
          <Route path='/users' element={<UserTable />}/>
          <Route path='/users/:id' element={<UserView users={users}/>}/>
        </Routes>
      </div>
    )
  }

  return (
    <div>
      <h1>blogs</h1>
      <Notification />
      <LoginForm />
    </div>
  )
}

export default App
