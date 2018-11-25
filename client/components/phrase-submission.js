import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {getSubmissions, createSubmission} from '../store/submissions'
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

  componentDidMount(){
    if(this.props.gameId) {
      this.props.getSubmissions({id: this.props.gameId})
    }
  }

  handleChange(ev) {
    this.setState({phrase: ev.target.value})
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const submission = {
      type: 'phrase',
      gameId: this.props.gameId,
      phrase: this.state.phrase,
      userId: this.props.user.id
    }

    this.props.createSubmission(submission)
    .then(()=> this.setState({phrase:''}))
  }

  render(){

    const { handleChange, handleSubmit } = this;

    const { submissions } = this.props
    const round = this.props.round
    if(!submissions[round]) return null
    let submission = ''

    return (
      <Fragment>
        <h1>
          Guess!
        </h1>
       <div>
       { submissions.length > 0 ?
       (
         <div>

         <CanvasDraw
           ref={canvasDraw => {
                    // eslint-disable-next-line no-return-assign
                    return (submission = canvasDraw);
                  }}
           disabled={true}
           immediate={true}
           />
           <button
            onClick={()=> submission.loadSaveData(submissions[round].drawingUrl)}
            type="submit"
           >
           Play drawing
           </button>
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
  createSubmission: (submission) => dispatch(createSubmission(submission))
})



export default connect(mapStateToProps, mapDispatchToProps)(PhraseSubmission)
