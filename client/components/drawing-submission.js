import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {getSubmissions, createSubmission} from '../store/submissions'
import {Link} from 'react-router-dom'
import uploadImage from '../../server/S3'

import CanvasDraw from 'react-canvas-draw'

class DrawingSubmission extends Component {
  constructor (props){
    super(props);
    this.handleClear = this.handleClear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.props.getSubmissions({id: this.props.gameId})
  }

  handleClear() {
    this.canvasRef.clear();
  }

  handleSubmit() {
    const recording = this.canvasRef.getSaveData();
    const submission = {
      type: 'drawing',
      gameId: this.props.match.params.gameId*1,
      userId: this.props.user.id,
      drawingUrl: recording
    }
    this.props.createSubmission(submission)
  }

  render(){
    const { handleClear, handleSubmit } = this;
    const {submissions} = this.props
    const round = 0

    return (
      <Fragment>
        <h1>
          DRAW! { submissions.length > 0 ? submissions[round].phrase : null}
        </h1>
        <CanvasDraw
          ref={(node)=> {this.canvasRef = node}} // now this component has a .canvas property which references this element
          loadTimeOffset={5}
          lazyRadius={0}
          brushRadius={5}
          brushColor="#222"
          catenaryColor="#222"
          gridColor="rgba(150,150,150,0.17)"
          hideGrid={true}
          canvasWidth={400}
          canvasHeight={400}
          disabled={false}
        />
        <button
          onClick={handleClear}
          type="submit"
          >
          Clear
          </button>
        <button
          onClick={handleSubmit}
          type="submit"
          >
          Submit (console logs for now)
          </button>
      </Fragment>
    )
  }
}

const mapStateToProps = ( { user, submissions }, { match }) => {
  return {
    gameId: match.params.gameId,
    user,
    submissions,
  }
}

const mapDispatchToProps = dispatch => ({
  getSubmissions: (game) => dispatch(getSubmissions(game)),
  createSubmission: (submission) => dispatch(createSubmission(submission))
})



export default connect(mapStateToProps, mapDispatchToProps)(DrawingSubmission)
