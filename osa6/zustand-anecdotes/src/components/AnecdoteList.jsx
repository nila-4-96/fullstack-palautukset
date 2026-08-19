import { useAnecdotes, useAnecdoteActions } from '../store'
import { useNotificationActions } from '../NotificationStore'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { vote, remove } = useAnecdoteActions()
  const { addNotif } = useNotificationActions()

  const actVote = (anecdote) => {
    console.log('vote', anecdote.id)
    console.log('has', anecdote.votes, '+ 1 votes')
    vote (anecdote)
  }

  const actRm = (anecdote) => {
    console.log('remove', anecdote.id)
    console.log('has', anecdote.votes, 'votes')
    remove (anecdote)
  }


  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => {
              actVote(anecdote)
              addNotif(`You voted '${anecdote.content}'`)
            }}>vote</button>
            {anecdote.votes == 0 && (
              <button onClick={() => {
                actRm(anecdote)
                addNotif(`You removed '${anecdote.content}'`)
              }}>remove</button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList