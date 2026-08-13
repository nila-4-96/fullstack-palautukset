import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import { useAnecdoteActions } from './store'
import { useNotification } from './NotificationStore'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const notification = useNotification()

  const { initialise } = useAnecdoteActions()

  useEffect(() => {
    initialise()
  }, [initialise])

  return (
    <div>
    <Notification notification={notification} />
    <h2>Anecdotes</h2>
    <Filter />
    <AnecdoteList />
    <AnecdoteForm />
    </div>
  )
}

export default App