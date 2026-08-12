import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import { useAnecdoteActions } from './store'
import Filter from './components/Filter'

const App = () => {
  const { initialise } = useAnecdoteActions()

  useEffect(() => {
    initialise()
  }, [initialise])

  return (
    <div>
    <h2>Anecdotes</h2>
    <Filter />
    <AnecdoteList />
    <AnecdoteForm />
    </div>
  )
}

export default App