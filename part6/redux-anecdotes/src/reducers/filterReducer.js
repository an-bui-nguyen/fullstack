import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterAction(state, action) {
      return action.payload
    }
  }
})

export default filterSlice.reducer
export const { filterAction } = filterSlice.actions

// export const filterAction = (filterValue) => {
//   return({
//     type: 'SET_FILTER',
//     payload: filterValue
//   })
// }

// const filterReducer = (state = '', action) => {
//   if (action.type === 'SET_FILTER') {
//     return action.payload
//   }

//   return state
// }

// export default filterReducer