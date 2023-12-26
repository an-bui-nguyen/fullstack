import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {message: '', time: 0},
  reducers: {
    setNotificationState(state, action) {
      return action.payload
    }
  }
})

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch(setNotificationState({message, time}))
    setTimeout(() => {
      dispatch(setNotificationState({message: '', time: 0}))
    }, time*1000);
  }
}

export const { setNotificationState } = notificationSlice.actions
export default notificationSlice.reducer