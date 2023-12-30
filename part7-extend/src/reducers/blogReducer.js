import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes)
    },
    modifyBlog(state, action) {
      const id = action.payload.id
      return state.map(blog => blog.id === id ? action.payload.modifiedBlog : blog).sort((a,b) => b.likes - a.likes)
    },
    removeBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload).sort((a,b) => b.likes - a.likes)
    }
  }
})

export default blogSlice.reducer

export const { appendBlog, setBlogs, modifyBlog, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getBlogs()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const addedBlog = await blogService.create(newBlog)
    dispatch(appendBlog(addedBlog))
  }
}

export const updateLikes = ( blogToUpdate ) => {
  return async (dispatch) => {
    const modifiedBlog = await blogService.updateLikes(blogToUpdate.id, { ...blogToUpdate, likes: blogToUpdate.likes + 1 })
    dispatch(modifyBlog({ id: blogToUpdate.id, modifiedBlog }))
  }
}

export const deleteBlog = ( id ) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch(removeBlog(id))
  }
}

