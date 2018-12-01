// action Types
const ADD_COMMENT = 'ADD_COMMENT'
const COMMENT_RECEIVED = 'COMMENT_RECEIVED'
let nextCommentId = 0

// action creators
export const addComment = (comment, author) => ({
  type: ADD_COMMENT,
  id: nextCommentId++,
  comment,
  author
})

export const commentReceived = (comment, author) => ({
  type: COMMENT_RECEIVED,
  id: nextCommentId++,
  comment,
  author
})

// reducer



export default function(state = [], action) {
  switch(action.type) {
    case ADD_COMMENT:
    case COMMENT_RECEIVED:
    const comment = { comment: action.comment, author: action.author}
    return [...state, comment]
    default: return state
  }
}
