import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from "../reducers/notificationReducer"

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const submitAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotification('anecdote added successfully', 3))
    // dispatch(setNotification('anecdote added successfully'))
    // setTimeout(() => {
    //   dispatch(setNotification(''))
    // }, 3000);
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={submitAnecdote}>
        <div><input name='content'/></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default NewAnecdote