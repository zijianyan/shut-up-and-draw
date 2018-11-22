import React, { Component } from 'react'
import { connect } from 'react-redux'
import GamePreview from './game-preview'

class GamesList extends Component {
  render(){
    const { games } = this.props
    if(!games) { return null }

    return (
      <div>
        <h1>Games List</h1>
        <div>
          {
            games.map(game => (
              <div>
                <GamePreview key={game.id} game={game}></GamePreview>
                <hr/>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({games}) => {
  return {
    games
  }
}


export default connect(mapStateToProps)(GamesList)
