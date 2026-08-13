import { useAnecdotes, useAnecdoteActions } from '../store'
import { useNotificationActions } from '../NotificationStore'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { vote } = useAnecdoteActions()
  const { addNotif } = useNotificationActions()

  const actVote = (anecdote) => {
    console.log('vote', anecdote.id)
    console.log('has', anecdote.votes, '+ 1 votes')
    vote (anecdote)
  }

  const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes)

  return (
    <div>
      {sortedAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => {
              actVote(anecdote)
              addNotif(`You voted '${anecdote.content}'`)
            }}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList