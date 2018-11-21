import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_USERS = 'GET_ALL_USERS'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const _getAllUsers = users => ({type: GET_ALL_USERS, users})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/api/users')
    dispatch(_getAllUsers(res.data || initialState))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users
    default:
      return state
  }
}
