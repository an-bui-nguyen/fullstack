import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    }
  }
})

export default userSlice.reducer
export const { setUsers } = userSlice.actions

export const getAllUsers = () => {
  return async (dispatch) => {
    const users = await userService.getUsers()
    dispatch(setUsers(users))
  }
}
