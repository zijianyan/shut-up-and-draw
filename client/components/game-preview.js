import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class GamePreview extends Component {


  render() {

    const { players, status, roundNumber, id } = this.props.game
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
              players[roundNumber] === me.id
              ? <div>Your Turn! <Link to={`/games/${id}/submissions`}><button>Play</button></Link></div>
              : <div>
                  {users.find(user => user.id === players[roundNumber]).name}'s
                  turn!<button>Nudge Them!</button>
                </div>
              : <button><Link to={`/games/${id}/compilation`}>View Finished Chain</Link></button>
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
