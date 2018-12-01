import React, { Component } from 'react'
import { connect } from 'react-redux'
import {createGame, getGames} from '../store/games'
import {Link} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import { Button } from '@material-ui/core'


const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: 'white',
  },
});

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
  this.selectPlayer = this.selectPlayer.bind(this)
}

  createNewGame (players) {
    const playersids = players.map(x => x.id)
    console.log(playersids)
    this.props.createGame({players: playersids})
      .then(game => {
        this.props.getGames()
        this.props.history.push(`/games/${game.data.id}/submissions`)
      })
  }

  addPlayer (player) {
    this.setState((prevState) => ({
      players: [...prevState.players, player]
    }))
  }

  selectPlayer(player) {
    const { players } = this.state
    const currentIndex = players.indexOf(player)
    const newChecked = [...players]

    if(currentIndex === -1) {
      newChecked.push(player)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    this.setState({
      players: newChecked
    })
  }


  removePlayer (player) {
    this.setState((prevState) => ({
      players: prevState.players.filter(x => x.id !== player.id)
    }))
  }

  render(){
    const { users } = this.props
    const { players } = this.state
    console.log('players ', players)
    const {addPlayer, removePlayer, createNewGame, selectPlayer} = this

    return (
      <div>
        <h1>Choose Some Friends</h1>
        <List>
          {
            users.map(user => {
              return (
              <ListItem key={user.id} onClick={()=> selectPlayer(user)} >
                <Checkbox
                  checked={players.indexOf(user) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText primary={user.name} />
              </ListItem>
            )})
          }
        </List>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={()=>createNewGame(players)}
          disabled={!players.length}
        >
          Create Game
        </Button>
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
    createGame: (players) => {
      return dispatch(createGame(players))
    },
    getGames: () => {
      return dispatch(getGames())
    }
  }
}


export default withStyles(styles)(connect(mapStateToProps, mapDispatch)(PlayersList))
