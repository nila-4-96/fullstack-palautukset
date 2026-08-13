import { useAnecdoteActions } from '../store'
import { useNotificationActions } from '../NotificationStore'

const AnecdoteForm = () => {
  const { add } = useAnecdoteActions()
  const { addNotif } = useNotificationActions()

  const addAnecdote = async (anecdote) => {
    anecdote.preventDefault()
    const content = anecdote.target.content.value
    await add(content)
    addNotif(`Anecdote '${content}' added`)
    anecdote.target.reset()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="content" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm