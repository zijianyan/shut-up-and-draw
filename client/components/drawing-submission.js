import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {getSubmissions, createSubmission} from '../store/submissions'
import { getGames } from '../store/games'
import {Link} from 'react-router-dom'
import uploadImage from '../../server/S3'

import CanvasDraw from 'react-canvas-draw'

class DrawingSubmission extends Component {
  constructor (props){
    super(props);
    this.state = {
      timer: 10, // number of seconds the timer will count down from
      intervalId: null // the browser needs this intervalId in order to know which timer to cancel later
    }
    this.updateTimer = this.updateTimer.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.startTimer();
    this.props.getSubmissions({id: this.props.gameId})
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId); // stops timer
  }

  startTimer() {
    const intervalId = setInterval(this.updateTimer, 1000);
    this.setState({ intervalId });
  }

  updateTimer() {
    if (this.state.timer > 0) {
      this.setState({ timer: this.state.timer-1 });
      console.log('this.state.timer:', this.state.timer);
    } else {
      this.handleTimeEnd();
    }
  }

  handleTimeEnd() {
    clearInterval(this.state.intervalId); // stops timer
    console.log('handleTimeEnd called, submit drawing automatically / display modal confirming submission');
  }

  handleClear() {
    this.canvasRef.clear();
  }

  handleSubmit() {
    const recording = this.canvasRef.getSaveData();
    const submission = {
      type: 'drawing',
      gameId: this.props.gameId*1,
      userId: this.props.user.id,
      drawingUrl: recording
    }
    this.props.createSubmission(submission)
    .then(()=> {
      clearInterval(this.state.intervalId) // stops timer
      this.props.getGames()
      this.props.history.push('/games')
      })

  }

  render(){
    const { handleClear, handleSubmit } = this;
    const { timer } = this.state;
    const {submissions} = this.props
    const round = this.props.round
    // console.log('this.props.round', round)

    return (

      <Fragment>
        <h1>
          DRAW! { submissions.length > 0 ? submissions[round].phrase : null}
        </h1>
        {
          timer
            ? <h2>Timer: { timer }</h2>
            : <h2>Time's up!</h2>
        }
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

const mapStateToProps = ( { user, submissions } ) => {
  return {
    user,
    submissions,
  }
}

const mapDispatchToProps = dispatch => ({
  getSubmissions: (game) => dispatch(getSubmissions(game)),
  createSubmission: (submission) => dispatch(createSubmission(submission)),
  getGames: () => dispatch(getGames())
})



export default connect(mapStateToProps, mapDispatchToProps)(DrawingSubmission)
