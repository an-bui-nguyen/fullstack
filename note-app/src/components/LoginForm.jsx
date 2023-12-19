import React from "react";

const LoginForm = ({ handleLogin, handleUsernameChange, handlePasswordChange, username, password }) => {

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input 
            type="text"
            value={username}
            name='Username'
            onChange={handleUsernameChange}
            id='username'
          />
        </div>

        <div>
          password
          <input 
            value={password}
            name='Password'
            type='password'
            onChange={handlePasswordChange}
            id='password'
          />
        </div>
        <button id='login-button' type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm