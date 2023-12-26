import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: initialState,
  reducers: {
    modifyAnecdote(state, action) {
      console.log(action.payload)
      const id = action.payload.id
      return state.map(anecdote => anecdote.id !== id ? anecdote : action.payload.modifiedAnecdote).sort((a, b) => b.votes - a.votes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload.sort((a, b) => b.votes - a.votes)
    }
  }
})

export const { modifyAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const increaseVote = (id) => {
  return async dispatch => {
    const modifiedAnecdote = await anecdoteService.increaseVote(id)
    dispatch(modifyAnecdote({id, modifiedAnecdote}))
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const addedAnecdote = await anecdoteService.addAnecdote(content)
    dispatch(appendAnecdote(addedAnecdote))
  }
}
export default anecdoteSlice.reducer

// export const increaseVote = (id) => {
//   return {
//     type: 'INCREASE_VOTE',
//     payload: id
//   }
// }

// export const createAnecdote = (content) => {
//   return {
//     type: 'CREATE_ANECDOTE',
//     payload: asObject(content)
//   }
// } 

// const reducer = (state = initialState, action) => {
//   if (action.type === 'INCREASE_VOTE') {
//     const id = action.payload
//     const anecdoteToChange = state.find(anecdote => anecdote.id === id)
//     console.log(anecdoteToChange)
//     const changedAnecdote = {
//       ...anecdoteToChange, votes: anecdoteToChange.votes + 1
//     }
//     return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote).sort((a, b) => b.votes - a.votes)
//   } else if (action.type === 'CREATE_ANECDOTE') {
//     return state.concat(action.payload).sort((a, b) => b.votes - a.votes)
//   }

//   return state
// }