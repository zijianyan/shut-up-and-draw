import React, { Component } from 'react'
import { connect } from 'react-redux'
import GamePreview from './game-preview'
import { Link } from 'react-router-dom'

class GamesList extends Component {


  render(){
    let games
    if(!this.props.games) { return null }

    if(this.props.match.params.status === 'active') {
      games = this.props.games.filter(game=> game.status ==='active')
    }
    if(this.props.match.params.status === 'completed') {
      games = this.props.games.filter(game => game.status === 'complete')
    }

    return (
      <div>
        <h1>Games List</h1>

        <button><Link to='/selectplayers'>Start a new game!</Link></button>
        <div>
          {
            games.map(game => (
              <div key={game.id}>
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
