import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_GAMES = 'GET_ALL_GAMES'
const CREATE_GAME = 'CREATE_GAME'
const UPDATE_GAME = 'UPDATE_GAME'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const _getAllGames = games => ({type: GET_ALL_GAMES, games})
const _createGame = game => ({type: CREATE_GAME, game})
const _updateGame = game => ({type: UPDATE_GAME, game})

/**
 * THUNK CREATORS
 */
export const getAllGames = () => async dispatch => {
  try {
    const res = await axios.get('/api/games')
    dispatch(_getAllGames(res.data || initialState))
  } catch (err) {
    console.error(err)
  }
}

export const createGame = (game) => async dispatch => {
  try {
    const res = await axios.post('/api/games', game)
    dispatch(_createGame(res.data || initialState))
  } catch (err) {
    console.error(err)
  }
}

export const updateGame = (game) => async dispatch => {
  try {
    const res = await axios.put(`/api/games/${game.id}`, game)
    dispatch(_updateGame(res.data || initialState))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_GAMES:
      return action.games
    case CREATE_GAME:
      return [...state, action.game]
    case UPDATE_GAME:
      return state.map( game => game.id === action.game.id ? action.game : game )
    default:
      return state
  }
}
