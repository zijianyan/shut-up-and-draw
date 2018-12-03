import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Button, Grid, Typography, CardHeader, Modal, CardContent } from '@material-ui/core'
import { sendText } from '../store/user'
import { withStyles } from '@material-ui/core/styles'

const styles = {
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

class GamePreview extends Component {
  constructor() {
    super()
    this.state = {
      open: false
    }
  }

  handleModalOpen = (event) => {
    event.preventDefault()
    this.setState({
      open: true
    })
  }

  handleModalClose = (event) => {
    event.preventDefault()
    this.setState({
      open: false
    })
  }


  render() {

    const { players, status, roundNumber, id } = this.props.game
    const { users, me, classes } = this.props
    const { handleModalOpen, handleModalClose } = this

    if(!users.length) return null

    return (
      <Fragment>
        <Card style={{ margin: 30, padding: 20, borderRadius: 15}}>
          <Typography variant="h3">{status}</Typography>
          <div>
            {
              players.map(player =>
              <Typography key={player} >
                {users.find(user => user.id === player).name}
              </Typography>)
            }
            <div>
              {
                status === 'active' ?
                players[roundNumber] === me.id
                ? <div>
                  <Typography>Your Turn!</Typography>
                    <div>
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={handleModalOpen}
                        >
                          Play
                        </Button>
                    </div>
                  </div>
                : <div>
                    <Typography>{users.find(user => user.id === players[roundNumber]).name}'s
                    turn!
                    </Typography>
                    <div>
                      <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        onClick={() => this.props._sendText(users.find(user => user.id === players[roundNumber]), this.props.game)}
                      >
                      Nudge Them!
                      </Button>
                    </div>

                  </div>
                : <Button variant="contained">
                    <Link to={`/games/${id}/compilation`}>View Finished Chain</Link>
                  </Button>
              }
            </div>
          </div>
        </Card>
        <Modal open={this.state.open} className={classes.modal}>
          <Card raised={true}>
            <CardContent className={classes.modal}>
              <Card raised={true}>
                <CardHeader
                  title="Prepare Your Artistic Spirit!"
                />
                <CardContent className={classes.padding}>
                  <Typography >
                      You'll get 30 seconds to interpret your friend's submission.
                  </Typography>
                </CardContent>
              </Card>
              <Link to={`/games/${id}/submissions`}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.padding}
                >
                  Let's Do This
                </Button>
              </Link>
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
      </Fragment>
    )
  }
}

const mapStateToProps = ({user,users}) => {
  return {
    me: user,
    users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    _sendText: (user, game) => dispatch(sendText(user, game))
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(GamePreview))
