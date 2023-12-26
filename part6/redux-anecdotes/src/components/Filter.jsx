import { useState } from "react"
import { filterAction } from "../reducers/filterReducer"
import { useDispatch } from "react-redux"

const Filter = () => {
  const [filterValue, setFilterValue] = useState('')
  const dispatch = useDispatch()

  const handleChange = (event) => {
    setFilterValue(event.target.value)
    dispatch(filterAction(event.target.value))
  }

  const style = {
    marginBottom: 10
  }
  return (
    <div style={style}>
      filter 
      <input 
        value={filterValue}
        onChange={handleChange}
      />
    </div>
  )
}

export default Filter