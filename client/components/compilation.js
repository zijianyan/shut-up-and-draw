import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSubmissions } from '../store/submissions'
import { getGames } from '../store/games'
import { Link } from 'react-router-dom'

class Compilation extends Component {

  componentDidMount() {
    this.props.getSubmissions({id: this.props.gameId})
  }

  componentDidUpdate() {
    if(!this.props.game.id){
      this.props.getGame()
    }
  }

  render() {
    const { submissions, users, game, games } = this.props
    if(!submissions && !games) {return null}

    return (
      <div>
        <h2>Game Compilation</h2>
        <h3>Masterfully created by: </h3>
        <ul>
          {
            game.players.map(player => <li key={player}>{users.find(user => user.id === player).name}</li>)
          }
        </ul>
        {
          submissions.map((submission,index) => (
            submission.drawingUrl
            ? <div key={submission.id}>
              <label>Drawing submission by {submission.user.name}</label>
              <img key={submission.id} src={submission.drawingUrl}></img>
              <hr />
              </div>
            : <div key={submission.id}>
              {index === 0 ? <label>Starting Phrase:</label> : <label>Phrase submission by {submission.user.name}</label>}
              <h4 key={submission.id} >{submission.phrase}</h4>
              <hr />
              </div>
          ))
        }
        <button><Link to='/selectplayers'>Play Again!</Link></button>
      </div>
    )
  }
}

const mapStateToProps = ({games, submissions, users, user}, {match}) => {
  const gameId = match.params.gameId*1
  const game = games.find(game => game.id === gameId)
  return {
    gameId,
    game,
    submissions,
    users,
    user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSubmissions: (game) => dispatch(getSubmissions(game)),
    getGames: () => dispatch(getGames())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Compilation)
