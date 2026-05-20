import {
  render,
  screen
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('only title and author are rendered at start', async () => {

  const blog = {
    title: 'Rendered title',
    author: 'Pim',
    url: 'gogel.co.ru.xyz'
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')

  expect(div).toHaveTextContent(
    'Rendered title'
  )

  expect(div).toHaveTextContent(
    'Pim'
  )

  expect(div).not.toHaveTextContent(
    'gogel.co.ru.xyz'
  )

  expect(div).not.toHaveTextContent(
    'likes'
  )
})

test('url, likes and user are shown when the view button is clicked', async () => {

  const blog = {
    title: 'Rendered title',
    author: 'Pim',
    url: 'gogel.co.ru.xyz',
    likes: 5,
    id: '123',
    user: {
      name: 'Magabur',
      username: 'magabur'
    }
  }

  const mockHandler = vi.fn()

  const { container } = render(<Blog blog={blog} user={mockHandler} />)

  const div = container.querySelector('.blog')

  const userTest = userEvent.setup()
  const button = screen.getByText('view')
  await userTest.click(button)

  expect(div).toHaveTextContent(
    'gogel.co.ru.xyz'
  )

  expect(div).toHaveTextContent(
    'likes 5'
  )

  expect(div).toHaveTextContent(
    'Magabur'
  )
})

test('like button can be clicked twice', async () => {

  const blog = {
    title: 'Rendered title',
    author: 'Pim',
    url: 'gogel.co.ru.xyz',
    likes: 5,
    id: '123',
    user: {
      name: 'Magabur',
      username: 'magabur'
    }
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} user={blog.user} handleLikes={mockHandler} />)

  const userTest = userEvent.setup()
  const button = screen.getByText('view')
  await userTest.click(button)

  const likeButton = screen.getByText('like')
  await userTest.click(likeButton)
  await userTest.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})