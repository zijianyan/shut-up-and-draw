import React from 'react'

const Comment = ({message}) => {
  return (
    <li key={message.id}>
      {message.text}
    </li>
  )
}

export default Comment
