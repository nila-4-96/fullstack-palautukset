import { useAnecdotes } from '../store'
import { useAnecdoteActions } from '../store'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { vote } = useAnecdoteActions()

  const actVote = (id, votes) => {
    console.log('vote', id)
    console.log('has', votes, '+ 1 votes')
    vote (id)
  }

  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => actVote(anecdote.id, anecdote.votes)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList