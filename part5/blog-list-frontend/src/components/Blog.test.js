/* eslint-env jest */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders blog title and author, hides url and number of likes by default', () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: '7',
    user: {
      name: 'Matti Luukkainen'
    }
  }

  const loggedOnUser = {
    name: 'Matti Luukkakinen'
  }

  const component = render(
    <Blog blog={blog} loggedOnUser={loggedOnUser} />
  )

  component.debug()

  const compactView = component.container.querySelector('.compactView')
  expect(compactView).toHaveTextContent('React patterns by Michael Chan')
  expect(compactView).not.toHaveAttribute('style', 'display: none;')

  const fullView = component.container.querySelector('.fullView')
  expect(fullView).toHaveAttribute('style', 'display: none;')
})
