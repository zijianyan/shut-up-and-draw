import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Button, Grid, Typography } from '@material-ui/core'
import { sendText } from '../store/user'

class GamePreview extends Component {
  render() {

    const { players, status, roundNumber, id } = this.props.game
    const { users, me } = this.props

    if(!users.length) return null

    return (
        <Card style={{ margin: 30, padding: 20, borderRadius: 15}}>
          <Typography variant="h3">{status}</Typography>
          <div>
            {
              players.map(player =>
              <div key={player} >
                {users.find(user => user.id === player).name}
              </div>)
            }
            <div>
              {
                status === 'active' ?
                players[roundNumber] === me.id
                ? <div>
                  Your Turn!
                    <div>
                      <Link to={`/games/${id}/submissions`}>
                        <Button
                          color="primary"
                          variant="contained"
                        >
                          Play
                        </Button>
                      </Link>
                    </div>
                  </div>
                : <div>
                    {users.find(user => user.id === players[roundNumber]).name}'s
                    turn!
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

export default connect(mapStateToProps, mapDispatchToProps)(GamePreview)
