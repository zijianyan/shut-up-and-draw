import React, { Component } from 'react'
import { connect } from 'react-redux'
import {createGame} from '../store/games'
import {Link} from 'react-router-dom'


class PlayersList extends Component {
  constructor (props){
  super(props);
  const {user} = this.props
  this.state = {
    players: [user], //initializes with logged in user
  };
  this.addPlayer = this.addPlayer.bind(this)
  this.removePlayer = this.removePlayer.bind(this)
  this.createNewGame = this.createNewGame.bind(this)
}

  createNewGame (players) {
    const playersids = players.map(x => x.id)
    console.log(playersids)
    this.props._createGame({players: playersids})
  }

  addPlayer (player) {
    this.setState((prevState) => ({
      players: [...prevState.players, player]
    }))
    console.log(this.state.players)
  }

  removePlayer (player) {
    this.setState((prevState) => ({
      players: prevState.players.filter(x => x.id !== player.id)
    }))
    console.log(this.state.players)
  }

  render(){
    const { users } = this.props
    const { players } = this.state
    const {addPlayer, removePlayer, createNewGame} = this

    return (
      <div>
        <h1>Select Players</h1>
        <ul>
          {
            users.map(user => {
              return (
              <li key={user.id} >
                {user.name}
                <button
                  type="submit"
                  onClick={()=>{
                    addPlayer(user)
                    user.selected=true
                  }}
                >
                Add
                </button>
                <button
                  type="submit"
                  onClick={()=>removePlayer(user)}
                >
                Remove
                </button>
              </li>
              )
          })
          }
        </ul>
        <h1>Players</h1>
        { players.length > 0 ?
          <ul>
            {players.map(player => <li key={player.id}>{player.name}</li>)}
          </ul>
          :
          null
        }
        <Link to='/submission' >
        <button
          type="submit"
          onClick={()=>createNewGame(players)}
          disabled={!players.length}
        >
          Create Game
        </button>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = ({users, user}) => {
  return {
    user,
    users: users.filter(x => x.id !== user.id)
  }
}
const mapDispatch = dispatch => {
  return {
    _createGame: (players) => {
      dispatch(createGame(players))
    }
  }
}


export default connect(mapStateToProps, mapDispatch)(PlayersList)
