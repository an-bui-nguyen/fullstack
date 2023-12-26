import { createSlice } from "@reduxjs/toolkit"
import noteService from '../services/notes'

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))


const initalState = [
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: 1,
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id: 2,
  },
  {
    content: 'combineReducers forms one reducer from many simple reducers',
    important: true,
    id: 3
  }
]

const noteSlice = createSlice({
  name: 'notes',
  initialState: initalState,
  reducers: {
    toggleImportanceOf(state, action) {
      const id = action.payload
      const noteToChange = state.find(note => note.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }

      console.log(JSON.parse(JSON.stringify(state)))

      return state.map(note => note.id !== id ? note : changedNote)
    },
    appendNote(state, action) {
      state.push(action.payload)
    },
    setNotes(state, action) {
      return action.payload
    }
  }
})

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch(setNotes(notes))
  }
}

export const createNote = content => {
  return async dispatch => {
    const newNote = await noteService.createNew(content)
    dispatch(appendNote(newNote))
  }
}

export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions
export default noteSlice.reducer

// const noteReducer = (state = initalState, action) => {
//   if (action.type === 'NEW_NOTE') {
//     return state.concat(action.payload)
//   } else if (action.type === 'TOGGLE_IMPORTANCE') {
//     const id = action.payload.id
//     const noteToChange = state.find(note => note.id === id)
//     const changedNote = {
//       ...noteToChange,
//       important: !noteToChange.important
//     }
//     return state.map(note => note.id != id ? note : changedNote)
//   }

//   return state
// }