import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_SUBMISSIONS = 'GET_SUBMISSIONS'
const CREATE_SUBMISSION = 'CREATE_SUBMISSION'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const _getSubmissions = submissions => ({type: GET_SUBMISSIONS, submissions})
const _createSubmission = submission => ({type: CREATE_SUBMISSION, submission})

/**
 * THUNK CREATORS
 */
export const getSubmissions = (game) => async dispatch => {
  try {
    const res = await axios.get(`/api/games/${game.id}/submissions${game.gameHash ? `?gameHash=${game.gameHash}`: '' }`)
    dispatch(_getSubmissions(res.data || initialState))
  } catch (err) {
    console.error(err)
  }
}

export const createSubmission = (submission) => async dispatch => {
  // req.body = { content, gameId: 1 }
  try {
    const res = await axios.post(`/api/games/${submission.gameId}/submissions`, submission)
    dispatch(_createSubmission(res.data || initialState))
    return await Promise.resolve(res.data)
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SUBMISSIONS:
      return action.submissions
    case CREATE_SUBMISSION:
      return [...state, action.submission]
    default:
      return state
  }
}
