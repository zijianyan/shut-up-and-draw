import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {getSubmissions, createSubmission} from '../store/submissions'
import { getGames } from '../store/games'
import CanvasDraw from 'react-canvas-draw'


class PhraseSubmission extends Component {
  constructor (props){
    super(props);
    this.state = {
      phrase: '',
      timer: 10, // number of seconds the timer will count down from
      intervalId: null // the browser needs this intervalId in order to know which timer to cancel later
    }
    this.updateTimer = this.updateTimer.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
  }

  componentDidMount(){
    this.startTimer();
    if(this.props.gameId) {
      this.props.getSubmissions({id: this.props.gameId})
    }
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

  handleChange(ev) {
    this.setState({phrase: ev.target.value})
  }

  handleSubmit(ev) {
    ev.preventDefault();
    clearInterval(this.state.intervalId); // stops timer
    const submission = {
      type: 'phrase',
      gameId: this.props.gameId,
      phrase: this.state.phrase,
      userId: this.props.user.id
    }
    this.props.createSubmission(submission)
    .then(()=> {
      this.setState({phrase:''})
      this.props.getGames()
      this.props.history.push('/games')
    })
  }


  handlePlay(event, submission) {
    event.preventDefault()
    this[submission.id].loadSaveData(submission.drawingUrl)
  }

  render(){

    const { handleChange, handleSubmit } = this;
    const { timer } = this.state;
    const { submissions } = this.props
    const round = this.props.round
    if(!submissions[round]) return null
    const submission = submissions[submissions.length-1]

    return (
      <Fragment>
        <h1>
          Guess!
        </h1>
        {
          timer
            ? <h2>Timer: { timer }</h2>
            : <h2>Time's up!</h2>
        }
       <div>
       { submissions.length > 0 ?
       (
         <div>
           <div onMouseEnter={(event) => this.handlePlay(event,submission)}>
              <CanvasDraw
                ref={canvasDraw => this[submission.id] = canvasDraw}
                disabled={true}
                immediate={true}
              />
            </div>
          </div>
       )
        : null
        }
       </div>
        <form onSubmit={handleSubmit}>
          <input
            name="guess"
            type="text"
            value={this.state.guess}
            onChange={handleChange}/>
          <button
            type="submit"
            >
            Guess the phrase!
          </button>
        </form>
      </Fragment>
    )
  }
}

const mapStateToProps = ( { user, submissions, games } ) => {
  return {
    user,
    submissions,
    games
  }
}

const mapDispatchToProps = dispatch => ({
  getSubmissions: (game) => dispatch(getSubmissions(game)),
  createSubmission: (submission) => dispatch(createSubmission(submission)),
  getGames: () => dispatch(getGames())
})



export default connect(mapStateToProps, mapDispatchToProps)(PhraseSubmission)
