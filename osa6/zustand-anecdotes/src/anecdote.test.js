import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('./services/notes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
  }
}))

import anecdoteService from './services/notes'
import useAnecdoteStore, { useAnecdotes, useAnecdoteActions } from './store'

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  vi.clearAllMocks()
})

describe('useAnecdoteActions', () => {
  it('initialise loads anecdotes from service', async () => {
    const mockAnecdotes = [{ id: 1, content: 'Test', votes: 0 }]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialise()
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toEqual(mockAnecdotes)
  })

  /*it('add appends a new anecdote', async () => {
    const newAnecdote = { id: 2, content: 'New anecdote', votes: 0 }
    anecdoteService.createNew.mockResolvedValue(newAnecdote)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.add('New anecdote')
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toContainEqual(newAnecdote)
  }) */

  it('anecdotes are sorted by votes in descending order', async () => {
    const mockAnecdotes = [
      { id: 1, content: 'Anecdote 1', votes: 9 },
      { id: 2, content: 'Anecdote 2', votes: 2 },
      { id: 3, content: 'Anecdote 3', votes: 15 },
    ]
    useAnecdoteStore.setState({ anecdotes: mockAnecdotes })

    const { result } = renderHook(() => useAnecdotes())
    expect(result.current).toEqual([
      { id: 3, content: 'Anecdote 3', votes: 15 },
      { id: 1, content: 'Anecdote 1', votes: 9 },
      { id: 2, content: 'Anecdote 2', votes: 2 },
    ])
  })

  it('anecdote filter works properly', async () => {
    const mockAnecdotes = [
      { id: 1, content: 'Anecdote 1', votes: 9 },
      { id: 2, content: 'Anecdote 2', votes: 2 },
      { id: 3, content: 'Anecdote 3', votes: 15 },
    ]
    useAnecdoteStore.setState({ anecdotes: mockAnecdotes, filter: '2' })

    const { result } = renderHook(() => useAnecdotes())
    expect(result.current).toEqual([
      { id: 2, content: 'Anecdote 2', votes: 2 },
    ])
  })

  it('vote increments vote count', async () => {
    const anecdote = { id: 1, content: 'Test', votes: 0 }
    useAnecdoteStore.setState({ anecdotes: [anecdote] })
    anecdoteService.update.mockResolvedValue({ ...anecdote, votes: anecdote.votes + 1 })

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.vote(1)
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current[0].votes).toBe(1)
  })
})