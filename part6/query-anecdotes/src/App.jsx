import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, increaseVote } from './requests'
import { useNotificationDispatch } from './NotificationContext'


const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const increaseVoteMutation = useMutation({
    mutationFn: increaseVote,
    onSuccess: (modifiedAnecdote) => {
      queryClient.setQueryData(['anecdotes', {id: modifiedAnecdote.id}], modifiedAnecdote)
      queryClient.invalidateQueries(['anecdotes'])
    }
  })

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }


  const handleVote = (anecdote) => {
    console.log('vote')
    increaseVoteMutation.mutate(anecdote)
    dispatch({type: 'SET_NOTIFICATION', payload: `anecdote "${anecdote.content}" voted`})
    setTimeout(() => {
      dispatch({type: 'SET_NOTIFICATION', payload: ''})
    }, 5000);
  }

  const anecdotes = result.data.sort((a, b) => b.votes - a.votes)

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
