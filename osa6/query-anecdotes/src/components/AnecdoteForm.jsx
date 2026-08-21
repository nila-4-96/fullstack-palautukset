const AnecdoteForm = ({ passedAnecdote }) => {
  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={passedAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm