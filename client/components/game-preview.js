import React, { Component } from 'react'
import { connect } from 'react-redux'

class GamePreview extends Component {


  render() {
    const { players, status, roundNumber } = this.props.game
    const { users, me } = this.props
    console.log(roundNumber)

    // will move the CSS to it's own file later
    const style = {
      border: 'solid black',
      borderWidth: 'thin'
    }

    if(!users) return null

    return (
      <div style={style}>
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
              roundNumber === players[me.id]
              ? <button>Your Turn!</button>
              : <div>
                  {users.find(user => user.id === players[roundNumber]).name}'s
                  turn!<button>Nudge Them!</button>
                </div>
              : <button>View Finished Chain</button>
            }
          </div>
        </div>
      </div>
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
