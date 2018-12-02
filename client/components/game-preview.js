import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Button } from '@material-ui/core'


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
                  <Button>
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

export default connect(mapStateToProps)(GamePreview)
