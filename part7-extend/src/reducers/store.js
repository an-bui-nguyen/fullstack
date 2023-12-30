import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './notificationReducer'
import blogReducer from './blogReducer'
import authReducer from './authReducer'
import userReducer from './userReducer'

const store = configureStore({
  reducer: {
    'notification': notificationReducer,
    'blogs': blogReducer,
    'auth': authReducer,
    'users': userReducer
  }
})

export default store