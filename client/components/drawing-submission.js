import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {getSubmissions, createSubmission} from '../store/submissions'
import {Link} from 'react-router-dom'
import uploadImage from '../../server/S3'

import CanvasDraw from 'react-canvas-draw'

class DrawingSubmission extends Component {
  constructor (props){
    super(props);
    const {user, game, submission} = this.props
    this.state = {
      submission,
      user,
      game
    };
    this.handleClear = this.handleClear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //TO DO: brainstorming how to pull in associated game w/ submission

  handleClear() {
    this.canvasRef.clear();
  }

  handleSubmit() {
    const base64 = this.canvasRef.canvas.drawing.toDataURL();
    const submission = {
      type: 'drawing',
      gameId: this.props.match.params.gameId*1,
      base64
    }
    this.props.createSubmission(submission)
  }

  render(){
    const { handleClear, handleSubmit } = this;
    return (
      <Fragment>
        <h1>
          DRAW!
        </h1>
        <CanvasDraw
          ref={(node)=> {this.canvasRef = node}} // now this component has a .canvas property which references this element
          loadTimeOffset={5}
          lazyRadius={0}
          brushRadius={5}
          brushColor={"#222"}
          catenaryColor={"#222"}
          gridColor={"rgba(150,150,150,0.17)"}
          hideGrid={true}
          canvasWidth={400}
          canvasHeight={400}
          disabled={false}
        />
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleSubmit}>Submit (console logs for now)</button>
      </Fragment>
    )
  }
}

const mapStateToProps = ({game, user, submissions}, { match }) => {
  const submission = submissions.find(x => x.id === match.params.gameId * 1);
  return {
    game,
    user,
    submission
  }
}

const mapDispatchToProps = dispatch => ({
  getSubmissions: (game) => dispatch(getSubmissions(game)),
  createSubmission: (submission) => dispatch(createSubmission(submission))
})



export default connect(mapStateToProps, mapDispatchToProps)(DrawingSubmission)
