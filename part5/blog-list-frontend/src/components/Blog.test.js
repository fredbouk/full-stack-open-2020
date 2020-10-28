/* eslint-env jest */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
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

  const compactView = component.container.querySelector('.compactView')
  expect(compactView).toHaveTextContent('React patterns by Michael Chan')
  expect(compactView).not.toHaveAttribute('style', 'display: none;')

  const fullView = component.container.querySelector('.fullView')
  expect(fullView).toHaveAttribute('style', 'display: none;')
})

test('blogs url and number of like are shown when view button is clicked', () => {
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

  const button = component.getByText('view')
  fireEvent.click(button)

  component.debug()

  const fullView = component.container.querySelector('.fullView')
  expect(fullView).toHaveAttribute('style', '')
  expect(fullView).toHaveTextContent('https://reactpatterns.com/')
  expect(fullView).toHaveTextContent('7')
})
