import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => {
  LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }

  return (
    <div id="loginForm" style={{ paddingBottom:'2rem' }}>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
      username
          <input
            type="text"
            value={username}
            name='Username'
            onChange={({ target }) => {setUsername(target.value)}}
          />
        </div>

        <div>
      password
          <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => {setPassword(target.value)}}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm