import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import anecdoteService from './services/notes'

const useAnecdoteStore = create(devtools((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    add: async (content) => {
      const newAnecdote = await anecdoteService.createNew(content)
      set(state => ({ anecdotes: state.anecdotes.concat(newAnecdote) }))
    },

    initialise: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes }))
    },

    vote: async (content) => {
      const newAnecdote = await anecdoteService.update(content.id, { ...content, votes: content.votes + 1 })
      set(state => ({
        anecdotes: state.anecdotes.map(anecdote =>
          anecdote.id === newAnecdote.id ? newAnecdote : anecdote
        )
      }))
    },

    remove: async (content) => {
      await anecdoteService.remove(content.id)
      set(state => ({
        anecdotes: state.anecdotes.filter(anecdote =>
          anecdote.id !== content.id
        )
      }))
    },

    setFilter: value => set(() => ({ filter: value }))
  }
})))


export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)
  if (filter === '') return [...anecdotes].toSorted((a, b) => b.votes - a.votes)
  if (filter !== '') return [...anecdotes].filter(a => a.content.toLowerCase().includes(filter.toLowerCase())).toSorted((a, b) => b.votes - a.votes)
}
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
export const useFilter = () => useAnecdoteStore((state) => state.filter)

export default useAnecdoteStore