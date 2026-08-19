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
    }
  }
})))

//
const useCounterStore = create(set => ({
  counter: 0,
  actions: {
    increment: () => set(state => ({ counter: state.counter + 1 })),
    decrement: () => set(state => ({ counter: state.counter - 1 })),
    zero: () => set(() => ({ counter: 0 }))
  }
}))


export const useCounter = () => useCounterStore(state => state.counter)
export const useCounterControls = () => useCounterStore(state => state.actions)

export default useCounterStore
//


export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)
  if (filter === '') return anecdotes
  if (filter !== '') return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
}
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
export const useFilter = () => useAnecdoteStore((state) => state.filter)