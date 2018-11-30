import React from 'react'
import { connect } from 'react-redux'
import Comment from './Comment'

const MessageList = ({comments}) => {
  return (
    <section id="comments-list">
    <ul>
    {comments.map(comment => (
      <Comment
      key={comment.id}
      {...comment}
      />
    ))}
    </ul>
  </section>
  )
}

const mapStateToProps = ({comments}) => {
  return {
    comments
  }
}

export default connect(mapStateToProps)(MessageList)
