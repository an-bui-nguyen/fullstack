import axios from 'axios'
const baseUrl = 'http://localhost:3000/api/notes'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
    return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token}
  }
  const request = axios.post(baseUrl, newObject, config)
  const response = await request
    return response.data
}

const update = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  const response = await request
  console.log(response.data);
    return response.data
}

export default { getAll, create, update, setToken }