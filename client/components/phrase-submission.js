import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {getSubmissions, createSubmission} from '../store/submissions'
import {Link} from 'react-router-dom'
import uploadImage from '../../server/S3'

import CanvasDraw from 'react-canvas-draw'

class PhraseSubmission extends Component {
  constructor (props){
    super(props);
    this.state = {
      phrase: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  //when you click on play - it should call all the submissions for that gam eid
  //the submissions reducer
  componentDidMount(){
    this.props.getSubmissions({id: this.props.gameId})
  }

  handleChange(ev) {
    this.setState({phrase: ev.target.value})
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const submission = {
      type: 'phrase',
      gameId: this.props.match.params.gameId*1,
      phrase: this.state.phrase,
      userId: this.props.user.id
    }
    console.log('submission')
    this.props.createSubmission(submission)
  }

  render(){
    const { handleChange, handleSubmit } = this;
    const { submissions } = this.props
    // const round = this.props.game ? this.props.game.roundNumber : null
    console.log('game in render',  this.props.game)
    return (
      <Fragment>
        <h1>
          Guess!
        </h1>
       <div>
       { submissions.length > 0 ?
      //  pass thru last drawing
        <img src={submissions[0].drawing}/>
        : null
        }
       </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="guess">
            Guess
          </label>
          <input
            name="guess"
            type="text"
            value={this.state.guess}
            onChange={handleChange}/>
          <button
            type="submit"
            >
            Submit
          </button>
        </form>
      </Fragment>
    )
  }
}

const mapStateToProps = ( {games, user, submissions}, { match }) => {
  const currentGame = games.find(x => x.id === match.params.gameId * 1)
  console.log(currentGame)
  return {
    gameId: match.params.gameId,
    user,
    submissions,
    game: currentGame
  }
}

const mapDispatchToProps = dispatch => ({
  getSubmissions: (game) => dispatch(getSubmissions(game)),
  createSubmission: (submission) => dispatch(createSubmission(submission))
})



export default connect(mapStateToProps, mapDispatchToProps)(PhraseSubmission)
