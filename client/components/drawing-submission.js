import React, { Component } from 'react'
import { connect } from 'react-redux'
import {getSubmissions} from '../store/submissions'
import {Link} from 'react-router-dom'

class DrawingSubmission extends Component {
  constructor (props){
    super(props);
    const {user, game, submission} = this.props
    this.state = {
      submission,
      user,
      game
    };
  }

  //TO DO: brainstorming how to pull in associated game w/ submission

  render(){
    return (
    <h1>
      DRAW!
    </h1>
    )
  }
}

const mapStateToProps = ({game, user, submissions}, { match }) => {
  const submission = submissions.find(x => x.id === match.params.id * 1);
  return {
    game,
    user,
    submission
  }
}

const mapDispatchToProps = dispatch => ({
  getSubmissions: (game) => dispatch(getSubmissions(game))
})



export default connect(mapStateToProps, mapDispatchToProps)(DrawingSubmission)
