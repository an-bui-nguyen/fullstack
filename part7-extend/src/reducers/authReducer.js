import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const authSlice = createSlice({
  name: 'auth',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  }
})

export default authSlice.reducer
export const { setUser } = authSlice.actions

export const getUserFromLocalStorage = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedPhonebookappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const handleUserLogin = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedPhonebookappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      dispatch(setUser(user))

    } catch (exception) {
      dispatch(setNotification('error', 'wrong credentials', 5))
    }
  }
}