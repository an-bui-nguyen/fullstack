import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleUserLogin } from '../reducers/authReducer'
import useField from '../hooks'

const LoginForm = () => {
  const dispatch = useDispatch()
  const { resetValue: resetUsername, ...username } = useField('text')
  const { resetValue: resetPassword, ...password } = useField('password')
  const user = useSelector(state => state.auth)

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(handleUserLogin(username.value, password.value))
    resetPassword()
    resetUsername()
  }

  if (user) {
    return (
      <></>
    )
  }

  return (
    <div id="loginForm" style={{ paddingBottom:'2rem' }}>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input {...username}/>
        </div>

        <div>
          password
          <input {...password}/>
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm