import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
<<<<<<< HEAD
import { Card, Button } from '@material-ui/core'
=======
import {sendText} from '../store/user'

class GamePreview extends Component {
>>>>>>> 526b65e2fd39dae55ca380d3f7ebf6acf35e94cc


class GamePreview extends Component {
  render() {

    const { players, status, roundNumber, id } = this.props.game
    const { users, me } = this.props

    if(!users.length) return null

    return (
      <Card>
        <div>{status}</div>
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
              ? <div>Your Turn! <Link to={`/games/${id}/submissions`}><Button>Play</Button></Link></div>
              : <div>
                  {users.find(user => user.id === players[roundNumber]).name}'s
                  turn!
<<<<<<< HEAD
                  <Button>
=======
                  <button
                    type="submit"
                    onClick={() => this.props._sendText(users.find(user => user.id === players[roundNumber]), this.props.game)}
                  >
>>>>>>> 526b65e2fd39dae55ca380d3f7ebf6acf35e94cc
                  Nudge Them!
                  </Button>

                </div>
              : <Button>
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
