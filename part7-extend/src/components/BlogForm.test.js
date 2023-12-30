import '@testing-library/jest-dom'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('BlogForm submit handler receives right props when new blog is created', async () => {
    const blogs =
    [
      {
        'title': 'haha',
        'author': 'Timmy',
        'url': 'I miss you',
        'likes': 3,
        'id': '656aa248ea2b4bec3766d55f'
      },
      {
        'title': 'hoho',
        'author': 'Duy An',
        'url': 'Nhớ em',
        'likes': 4,
        'id': '656c12612bc7da56c0412a95'
      }
    ]
    const setErrorMessage = jest.fn()
    const setBlogs = jest.fn()

    const user = userEvent.setup()

    render(<BlogForm setBlogs={setBlogs} setErrorMessage={setErrorMessage} blogs={blogs}/>)

    const createNew = screen.queryByText('create new blog')
    await user.click(createNew)

    screen.debug()

    const authorInput = screen.queryByTestId('author')
    const urlInput = screen.queryByTestId('url')
    const titleInput = screen.queryByTestId('title')

    await user.type(authorInput, 'BTS')
    await user.type(urlInput, 'https://www.youtube.com/watch?v=gdZLi9oWNZg')
    await user.type(titleInput, 'Dynamite Official MV')

    const submitButton = screen.queryByTestId('submitButton')

    screen.debug(submitButton)

    await user.click(submitButton)

    expect(setBlogs.mock.calls).toHaveLength(1)
    expect(setBlogs.mock.calls[0][0].content).toBe('BTS')
  })
})