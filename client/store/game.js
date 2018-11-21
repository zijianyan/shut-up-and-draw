import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_GAME = 'GET_GAME'
const GET_ALL_GAMES = 'GET_ALL_GAMES'

/**
 * INITIAL STATE
 */
const initialState = {
  game: {},
  games: []
}

/**
 * ACTION CREATORS
 */
const getGame = game => ({ type: GET_GAME, game })
const getAllGames = games => ({ type: GET_ALL_GAMES, games })

/**
 * THUNK CREATORS
 */



/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_GAME:
      return {...state, game: action.game}
    case GET_ALL_GAMES:
      return {...state, games: action.games}
    default:
      return state
  }
}
