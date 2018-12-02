import React from 'react'

const Comment = ({message}) => {
  return (
    <div key={message.id}>
      <b>{message.author}</b>: {message.text}
    </div>
  )
}

export default Comment
