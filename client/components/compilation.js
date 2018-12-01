import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSubmissions } from '../store/submissions'
import { getGames } from '../store/games'
import { Link } from 'react-router-dom'
import CanvasDraw from 'react-canvas-draw'
import queryString from 'query-string'
import { Paper, Typography, Button, Grid, Zoom } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
const styles = theme => ({
  paper: {
    padding: 1000,
    marginTop:10,
    marginBottom: 10,
    width: 200,
  },
  container: {
    flexGrow: 1
  }

});




class Compilation extends Component {

  constructor(props){
    super(props)
    this.state = {}
    this.handlePlay = this.handlePlay.bind(this)
  }

  componentDidMount() {
    const query = queryString.parse(this.props.location.search)
    if(query.gameHash){
      this.props.getSubmissions({id: this.props.gameId, gameHash: query.gameHash})
    } else {
      this.props.getSubmissions({id: this.props.gameId})
    }
  }

  handlePlay(event, submission) {
    event.preventDefault()
    this[submission.id].loadSaveData(submission.drawingUrl)
  }

  render() {
    const { submissions, users, game, games, classes } = this.props
    if(!users.length || !games.length || !submissions.length) {return null}
    return (
      <div>
        <h2>Game Compilation</h2>

        <h3>Masterfully created by: </h3>

        <Grid container spacing={16} justify="center">

        {

          submissions.map((submission,index) => (
            submission.drawingUrl
            ?
              <div key={submission.id} >
                <Zoom in style={{ transitionDelay:'500ms'}}>
                  <Grid item xs={12} padding={30}>
                    <Paper className="paper">
                      <Typography
                        variant="h5"
                      >
                        Drawing submission by {users.find(user => user.id === submission.userId).name}
                      </Typography>
                      <div
                        onMouseEnter={(event) => this.handlePlay(event,submission)}
                        onClick={(event) => this.handlePlay(event,submission)}
                      >
                        <CanvasDraw
                          ref={canvasDraw => this[submission.id] = canvasDraw}
                          disabled={true}
                          immediate={true}
                          lazyRadius={0}
                          brushRadius={5}
                          brushColor="#222"
                          catenaryColor="#222"
                          hideGrid={true}
                        />
                        <Button
                          color="secondary"
                          onClick={()=> {this[submission.id].loadSaveData(submission.drawingUrl)}}
                        >
                          Play drawing
                        </Button>
                      </div>
                      </Paper>
                    </Grid>
                </Zoom>
              </div>
            :
              <div key={submission.id}>
                <Grid item xs={12}>
                  <Zoom in style={{ transitionDelay:'500ms'}}>
                    <Paper className="paper">
                      {
                        index === 0 ?
                          <label>Starting Phrase:</label>
                          :
                          <label>
                            Phrase submission by {users.find(user => user.id === submission.userId).name}
                          </label>
                      }
                        <Typography
                          variant="h5"
                          key={submission.id}
                        >
                          {submission.phrase}
                        </Typography>
                      </Paper>
                    </Zoom>
                  </Grid>
                </div>
          ))
        }
        </Grid>
        <Link to='/selectplayers'>
          <Button
            color="primary"
          >
            Play Again!
          </Button>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = ({games, submissions, users, user}, {match}) => {
  const gameId = match.params.gameId*1
  const game = games.find(game => game.id === gameId)
  return {
    gameId,
    game,
    games,
    submissions,
    users,
    user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSubmissions: (game) => dispatch(getSubmissions(game)),
    getGames: () => dispatch(getGames())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Compilation))
