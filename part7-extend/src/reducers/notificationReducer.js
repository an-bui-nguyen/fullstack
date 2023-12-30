import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotificationState(state, action) {
      return action.payload
    }
  }
})

export const { setNotificationState } = notificationSlice.actions

export default notificationSlice.reducer

export const setNotification = (type, message, time) => {
  return async (dispatch) => {
    dispatch(setNotificationState({ type, message, time }))
    setTimeout(() => {
      dispatch(setNotificationState(null))
    }, time * 1000)
  }
}