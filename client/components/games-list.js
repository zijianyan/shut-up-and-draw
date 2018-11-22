import React, { Component } from 'react'
import { connect } from 'react-redux'

class GamesList extends Component {
  render(){
    const { games, users } = this.props
    if(!games && !users) { return null }

    return (
      <div>
        <h1>Games List</h1>
        <div>
          {
            games.map(game => (
              <div key={game.id}>
                {game.status}
                <ul>
                  {
                    game.players.map(player => (
                      <li key={player} >{users.find(user => user.id === player).name}</li>
                    ))
                  }
                </ul>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({games, users}) => {
  return {
    games,
    users
  }
}


export default connect(mapStateToProps)(GamesList)
