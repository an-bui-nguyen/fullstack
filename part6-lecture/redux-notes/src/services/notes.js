import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, important: false }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const toggleImportance = async (id) => {
  const notes = await getAll()
  const returnedObject = notes.find(note => note.id === id)
  const response = await axios.put(`${baseUrl}/${id}`, {...returnedObject, important: !returnedObject.important})
  return response.data
}

export default { 
  getAll,
  createNew,
  toggleImportance
}