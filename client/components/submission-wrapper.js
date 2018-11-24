import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {getSubmissions, createSubmission} from '../store/submissions'
import {DrawingSubmission, PhraseSubmission} from './index'

class SubmissionWrapper extends Component {

  componentDidMount(){
    this.props.getSubmissions({id: this.props.gameId})
  }

  render(){
    if(!this.props.games) return null
    const { games, game, user, gameId, submissions } = this.props

    console.log('user', user)
    console.log('gameId', gameId)
    console.log('games', games)
    console.log('game', game)
    console.log('submissions', submissions)

    const round = game ? game.roundNumber : 0
    const isDrawing = round % 2 === 0
    console.log('roundnumber', round)

    return (
      <Fragment>
        <h1>ok</h1>
      {
        even ?
        <DrawingSubmission />
        :
        <PhraseSubmission />
      }
      ,</Fragment>
    )
  }
}

const mapStateToProps = ( { games, user, submissions }, { match }) => {
  const game = games.find( x => x.id === match.params.gameId*1)

  return {
    gameId: match.params.gameId,
    user,
    submissions,
    games,
    game
  }

}

const mapDispatchToProps = dispatch => ({
  getSubmissions: (game) => dispatch(getSubmissions(game)),
})


export default connect(mapStateToProps, mapDispatchToProps)(SubmissionWrapper)
