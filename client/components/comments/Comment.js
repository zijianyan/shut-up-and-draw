import React from 'react'

const Comment = ({message}) => {
  return (
    <li>
      {message.text}
    </li>
  )
}

export default Comment
