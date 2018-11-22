import React, { Component } from 'react'
import { connect } from 'react-redux'

class GamePreview extends Component {


  render() {
    const {players, status} = this.props.game
    const { users, me } = this.props

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
          <button>
            {

            }
          </button>
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
