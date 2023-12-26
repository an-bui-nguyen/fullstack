import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addAnecdote = async (content) => {
  const response = await axios.post(baseUrl, {content, votes: 0})
  return response.data
}

const increaseVote = async (id) => {
  const anecdotes = await getAll()
  const returnedObject = anecdotes.find(anecdote => anecdote.id === id)
  const response = await axios.put(`${baseUrl}/${id}`, {...returnedObject, votes: returnedObject.votes + 1})
  return response.data
}

export default {
  getAll,
  addAnecdote,
  increaseVote
}