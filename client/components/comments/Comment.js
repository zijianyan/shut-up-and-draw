import React from 'react'

const Comment = ({comment, author}) => {
  return (
    <p>
      <i>{author}</i>: {comment}
    </p>
  )
}

export default Comment
