import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getBlogs = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateLikes = async (blogId, updatedObject) => {
  const response = await axios.put(`${baseUrl}/${blogId}`, updatedObject)
  console.log(response.data)
  return response.data
}

const deleteBlog = async (blogId) => {
  const config = {
    headers: { Authorization: token }
  }
  try {
    const response = await axios.delete(`${baseUrl}/${blogId}`, config)
    console.log(response.status)
  } catch(error) {
    throw new Error(error)
  }
}

export default { getBlogs, setToken, create, updateLikes, deleteBlog }