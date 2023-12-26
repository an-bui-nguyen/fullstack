import { createSlice } from "@reduxjs/toolkit"

// const filterReducer = (state = 'ALL', action) => {
//   switch(action.type) {
//     case 'SET_FILTER':
//       return action.payload
//     default:
//       return state
//   }
// }

// export const filterChange = filter => {
//   return {
//     type: 'SET_FILTER',
//     payload: filter
//   }
// }

// export default filterReducer

const filterSlice = createSlice({
  name: 'filter',
  initialState: 'ALL',
  reducers: {
    filterChange(state, action) {
      state = action.payload
    }
  }
})

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer