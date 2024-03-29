import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Note from "./Note"
import userEvent from "@testing-library/user-event"

test('renders content', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const mockHandler = jest.fn()

  const { container } = render(<Note note={note} toggleImportance={mockHandler}/>)

  const div = container.querySelector('.note')
  screen.debug(div)
  expect(div).toHaveTextContent('Component testing is done with react-testing-library')

  const user = userEvent.setup()
  const button = container.querySelector('button')
  await user.click(button)
  expect(mockHandler.mock.calls).toHaveLength(1)
})
