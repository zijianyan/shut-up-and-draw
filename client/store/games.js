import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_GAMES = 'GET_GAMES'
const CREATE_GAME = 'CREATE_GAME'
const UPDATE_GAME = 'UPDATE_GAME'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const _getGames = games => ({type: GET_GAMES, games})
const _createGame = game => ({type: CREATE_GAME, game})
const _updateGame = game => ({type: UPDATE_GAME, game})

/**
 * THUNK CREATORS
 */
export const getGames = () => async dispatch => {
  try {
    const res = await axios.get('/api/games')
    dispatch(_getGames(res.data || initialState))
  } catch (err) {
    console.error(err)
  }
}

export const createGame = (game) => async dispatch => {
  try {
    const res = await axios.post('/api/games', game)
    console.log(res.data)
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
    case GET_GAMES:
      return action.games
    case CREATE_GAME:
      return [...state, action.game]
    case UPDATE_GAME:
      return state.map( game => game.id === action.game.id ? action.game : game )
    default:
      return state
  }
}
