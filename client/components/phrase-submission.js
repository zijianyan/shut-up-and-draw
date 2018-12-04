import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {getSubmissions, createSubmission} from '../store/submissions'
import { getGames } from '../store/games'
import CanvasDraw from 'react-canvas-draw'
import { Typography, Button, Card, CardActionArea, CardActions, CardContent, TextField, CardHeader, Modal } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  root: {
    flexGrow: 1,
    alignItems: 'center'
  },
  grow: {
    flexGrow: 1,
  },

  card: {
    margin: 20,
    padding: 20,
    borderRadius: 15,
    borderColor: 'gray',
    textAlign: 'center',
  },

  center: {
    display: 'inline-block'
  },
  modal: {
    margin: 50,
    padding: 50,
  },
  padding: {
    padding: 5,
    margin: 5
  }

};

class PhraseSubmission extends Component {
  constructor (props){
    super(props);
    this.state = {
      phrase: '',
      timer: 30, // number of seconds the timer will count down from
      intervalId: null, // the browser needs this intervalId in order to know which timer to cancel later
      open: false
    }
    this.updateTimer = this.updateTimer.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
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
    } else {
      this.handleTimeEnd();
    }
  }

  handleTimeEnd() {
    clearInterval(this.state.intervalId); // stops timer
  }

  handleChange(ev) {
    this.setState({phrase: ev.target.value})
  }

  handleSubmit(ev) {
    ev.preventDefault();
    clearInterval(this.state.intervalId); // stops timer
    this.setState({ open: true })
  }

  handleModalClose() {
    const submission = {
      type: 'phrase',
      gameId: this.props.gameId,
      phrase: this.state.phrase,
      userId: this.props.user.id
    }
    this.setState({open: false})
    this.props.createSubmission(submission)
    .then(()=> {
      this.props.getGames()
      this.setState({phrase:'',open: false})
      this.props.history.push(`/games/${this.props.gameId}/compilation`)
      })
  }


  handlePlay(event, submission) {
    event.preventDefault()
    this[submission.id].loadSaveData(submission.drawingUrl)
  }

  render(){

    const { handleChange, handleSubmit, handleModalClose } = this;
    const { timer } = this.state;
    const { submissions, classes } = this.props
    const round = this.props.round
    if(!submissions[round]) return null
    const submission = submissions[submissions.length-1]

    return (
      <Fragment>
        <Card className={classes.card}>
          <Typography variant="h5" component="h3">Guess!</Typography>

        {
          timer
            ? <Typography variant="h5" component="h4">Timer: { timer }</Typography>
            : <Typography variant="h5" component="h4">Time's up!</Typography>
        }
       <div>
       { submissions.length > 0 ?
       (
          <CardContent align='center' onMouseEnter={(event) => this.handlePlay(event,submission)}>
            <CanvasDraw
              ref={canvasDraw => this[submission.id] = canvasDraw}
              disabled={true}
              immediate={true}
            />
          </CardContent>
       )
        : null
        }
       </div>
       </Card>
       <Card className={classes.card}>
          <Typography variant="h5" component="h4">What is this? </Typography>
          <CardContent>
            <TextField
              id="outlined-name"
              label="Guess"
              name="phrase"
              placeholder='Your Guess Here'
              type="text"
              value={this.state.phrase}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              />
            </CardContent>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={!this.state.phrase.length}
              >
              Submit
            </Button>
        </Card>
        <Modal open={this.state.open} className={classes.modal}>
            <Card raised={true}>
              <CardContent className={classes.card}>
                <Card raised={true}>
                <CardHeader
                  title={`"${this.state.phrase}"`}
                />
                <CardContent className={classes.card}>
                <Typography >
                  If you say so! We'll sending this phrase down the line.
                </Typography>
                <Typography >
                  You're not making this easy on them, are you?
                </Typography>
                </CardContent>
                </Card>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={handleModalClose}
                  className={classes.padding}
                >
                  View Game Progress
                </Button>
              </CardContent>
            </Card>
          </Modal>
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



export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PhraseSubmission))
