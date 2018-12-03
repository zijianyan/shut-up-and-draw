import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {createGame, getGames} from '../store/games'
import {Link} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import { Button, Card, Divider, Typography, Modal, CardHeader, CardContent } from '@material-ui/core'


const styles = {
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: 'white',
  },
  card: {
    margin: 100,
    padding: 100,
    borderRadius: 15,
    borderColor: 'gray',
    textAlign: 'center'
  },
  modal: {
    margin: 50,
    padding: 50,
    borderRadius: 15,
    borderColor: 'gray',
    textAlign: 'center'
  },
  padding: {
    padding: 7,
    margin: 5
  }
};

class PlayersList extends Component {
  constructor (props){
  super(props);
  const {user} = this.props
  this.state = {
    players: [user], //initializes with logged in user
    open: false
  };
  this.addPlayer = this.addPlayer.bind(this)
  this.removePlayer = this.removePlayer.bind(this)
  this.createNewGame = this.createNewGame.bind(this)
  this.selectPlayer = this.selectPlayer.bind(this)
  this.handleModalOpen = this.handleModalOpen.bind(this)
  this.handleModalClose = this.handleModalClose.bind(this)
}

  createNewGame (event) {
    event.preventDefault()
    const playersids = this.state.players.map(x => x.id)
    console.log(playersids)
    this.props.createGame({players: playersids})
      .then(game => {
        this.props.getGames()
        this.setState({open: false})
        this.props.history.push(`/games/${game.data.id}/submissions`)
      })
  }

  handleModalOpen(event) {
    event.preventDefault()
    this.setState({open: true})
  }

  handleModalClose(event){
    event.preventDefault()
    this.setState({open: false})
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
    const { users, classes } = this.props
    const { players } = this.state
    const { createNewGame, selectPlayer, handleModalOpen, handleModalClose } = this

    return (
      <div>
        <Card className={classes.card} align='center'>
        <Typography variant='h3'>Choose Some Friends</Typography>
        <List>
          {
            users.map(user => {
              return (
              <Fragment key={user.id}>
                <Divider />
                <ListItem onClick={()=> selectPlayer(user)} >
                  <Checkbox
                    checked={players.indexOf(user) !== -1}
                    tabIndex={-1}
                  />
                  <ListItemText primary={user.name} />
                </ListItem>
              </Fragment>
            )})
          }
        </List>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleModalOpen}
          disabled={!players.length}
        >
          Let's Do This
        </Button>
        </Card>
        <Modal open={this.state.open} className={classes.modal}>
            <Card raised={true}>
              <CardContent className={classes.modal}>
                <Card raised={true}>
                <CardHeader
                  title="Prepare Your Artistic Spirit!"
                />
                <CardContent className={classes.modal}>
                <Typography className={classes.padding}>
                  On the next page, you'll be given a phrase to draw. You'll get 30 seconds to draw your best interpretation of the phrase.
                </Typography>
                <Typography className={classes.padding}>
                  That submission will be sent down the line for your friends to guess what phrase you received.
                </Typography>
                </CardContent>
                </Card>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={createNewGame}
                  className={classes.padding}
                >
                  Shut Up and Let Me Draw
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={handleModalClose}
                  className={classes.padding}
                >
                  Go Back
                </Button>
              </CardContent>
            </Card>
          </Modal>
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
