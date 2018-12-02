import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {getSubmissions, createSubmission} from '../store/submissions'
import { getGames } from '../store/games'
import {Link} from 'react-router-dom'
import uploadImage from '../../server/S3'
import CanvasDraw from 'react-canvas-draw'
import { Typography, Button, Card, CardActions, CardContent, Modal, CardMedia, CardHeader } from '@material-ui/core'
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
  media: {
    margin: 20,
    padding: 20,
    height: 100,
    width: 100,
    borderColor: 'gray',
    display: 'inline-block'
  },
  padding: {
    padding: 5,
    margin: 5
  }

};


class DrawingSubmission extends Component {
  constructor (props){
    super(props);
    this.state = {
      timer: 30, // number of seconds the timer will count down from
      intervalId: null, // the browser needs this intervalId in order to know which timer to cancel later
      open: false,
      image: ''
    }
    this.updateTimer = this.updateTimer.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
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
    } else {
      this.handleTimeEnd();
    }
  }

  handleTimeEnd() {
    clearInterval(this.state.intervalId); // stops timer
  }

  handleClear() {
    this.canvasRef.clear();
  }

  handleSubmit() {
    const image = this.canvasRef.canvas.drawing.toDataURL()
    this.setState({open: true, image})
  }

  handleModalClose() {
    const recording = this.canvasRef.getSaveData();
    const submission = {
      type: 'drawing',
      gameId: this.props.gameId*1,
      userId: this.props.user.id,
      drawingUrl: recording
    }
    this.props.createSubmission(submission)
    .then((submission)=> {
      clearInterval(this.state.intervalId) // stops timer
      this.props.getGames()
      this.setState({open: false})
      this.props.history.push(`/games/${this.props.submissions[0].gameId}/compilation`)
      })
  }

  render(){
    const { handleClear, handleSubmit, handleModalClose } = this;
    const { timer } = this.state;
    const {submissions, classes} = this.props
    const round = this.props.round


    return (

      <Fragment>
        <Card className={classes.card} raised={true}>
          <Typography variant="h5" component="h3">DRAW! </Typography>
          <Typography variant="h5" component="h4">{ submissions.length > 0 ? submissions[round].phrase : null}</Typography>

        {
          timer
            ? <Typography variant="h5" component="h4">Time Left: { timer }</Typography>
            : <Typography variant="h5" component="h4">Time's up!</Typography>
        }
        </Card>
        <Card className={classes.card} raised={true}>
          <CardContent className='canvas' align='center'>
          <CanvasDraw
            ref={(node)=> {this.canvasRef = node}} // now this component has a .canvas property which references this element
            loadTimeOffset={5}
            lazyRadius={0}
            brushRadius={2}
            brushColor="#222"
            catenaryColor="#222"
            gridColor="rgba(150,150,150,0.17)"
            // hideGrid={true}
            canvasWidth={400}
            canvasHeight={400}
            disabled={false}
          />
          </CardContent>
          <CardActions className={classes.center} >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleClear}
              >
              Clear
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              >
              Submit
            </Button>
          </CardActions>
          </Card>
          <Modal open={this.state.open} className={classes.modal}>
            <Card >
              <CardContent className={classes.card}>
                <Card raised={true}>
                  <CardHeader
                    title="It's a masterpiece!"
                  />
                  <CardMedia
                    src={this.state.image}
                    component='img'
                    className={classes.media}
                    />
                </Card>
                </CardContent>
                <CardContent className={classes.card}>
                <Typography >
                  We're sending it to down the line. Clearly they'll know exactly what it is... right?
                </Typography>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={handleModalClose}
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



export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(DrawingSubmission))
