import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {getSubmissions, createSubmission} from '../store/submissions'

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

    this.props.createSubmission(submission)
    .then(()=> this.setState({phrase:''}))
  }

  render(){
    const { handleChange, handleSubmit } = this;
    const { submissions } = this.props

    return (
      <Fragment>
        <h1>
          Guess!
        </h1>
       <div>
       { submissions.length > 0 ?
        <img src={submissions[1].drawingUrl}/>
        // console.log('submissions 0', submissions[1])
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



export default connect(mapStateToProps, mapDispatchToProps)(PhraseSubmission)
