import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {getSubmissions} from '../store/submissions'
import {DrawingSubmission, PhraseSubmission} from './index'

class SubmissionWrapper extends Component {

  componentDidMount(){
    if(this.props.game) {
      this.props.getSubmissions(this.props.game)
    }
  }

  render(){
    if(!this.props.game || !this.props.gameId) return null
    const { game, gameId } = this.props
    console.log('round', game.roundNumber)

    const round = game ? game.roundNumber : 0
    const isDrawing = round % 2 === 0
    return (
      <Fragment>
      {
        isDrawing ?
        <DrawingSubmission gameId={gameId} round={round} history={this.props.history} />
        :
        <PhraseSubmission gameId={gameId} round={round} history={this.props.history}/>
      }
      </Fragment>
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
