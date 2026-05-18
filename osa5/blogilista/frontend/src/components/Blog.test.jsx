import {
  render,
  // screen
} from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('only title and author are rendered at start', async () => {

  const blog = {
    title: 'Only rendered title',
    author: 'Pim',
    url: 'gogel.co.ru.xyz'
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')

  expect(div).toHaveTextContent(
    'Only rendered title'
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