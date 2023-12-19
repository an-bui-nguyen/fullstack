import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let mockLikes
  let mockRemove

  beforeEach(() => {
    mockLikes = jest.fn()
    mockRemove = jest.fn()
    const blog = {
      'title': 'Butterfly',
      'author': 'BTS',
      'url': 'https://www.youtube.com/watch?v=Xy9heqcKLAI',
      'likes': 2
    }

    render(<Blog updateLikes={mockLikes} handleRemove={mockRemove} blog={blog}/>)
  })

  test('<Blog /> renders title and author but not URL and likes by default', () => {
    const url = screen.queryByTestId('url')
    const likes = screen.queryByTestId('likes')
    expect(url).toBeNull()
    expect(likes).toBeNull()
  })

  test('<Blog /> shows URL and likes when toggle button is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.queryByTestId('view')

    await user.click(button)

    const url = screen.queryByTestId('url')
    const likes = screen.queryByTestId('likes')
    expect(url).not.toBeNull()
    expect(likes).not.toBeNull()
  })

  test('Event handler for like button called twice when clicked twice', async () => {
    const user = userEvent.setup()
    const viewButton = screen.queryByTestId('view')
    await user.click(viewButton)

    const likeButton = screen.queryByTestId('likeButton')

    screen.debug()

    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockLikes.mock.calls).toHaveLength(2)
  })

  afterAll(() => {
    render()
  })
})