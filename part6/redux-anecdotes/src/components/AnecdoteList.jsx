import { useDispatch, useSelector } from 'react-redux'
import { increaseVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import PropTypes from 'prop-types'

const Anecdote = ({ anecdote, handleVote }) => {
  Anecdote.propTypes = {
    anecdote: PropTypes.object.isRequired,
    handleVote: PropTypes.func.isRequired
  }

  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  })

  const vote = async (id, content) => {
    dispatch(increaseVote(id))
    dispatch(setNotification(`you voted '${content}'`, 3))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
          <Anecdote 
            key={anecdote.id}
            anecdote={anecdote}
            handleVote={() => vote(anecdote.id, anecdote.content)}
          />
      )}
    </div>
  )
}

export default Anecdotes