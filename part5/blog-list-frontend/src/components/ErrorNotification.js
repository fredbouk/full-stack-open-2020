import React from 'react'

const ErrorNotification = ({ message }) => {
  const notificationStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === '') {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default ErrorNotification
