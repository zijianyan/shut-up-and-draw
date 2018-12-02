import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSubmissions } from '../store/submissions'
import { getGames } from '../store/games'
import { Link } from 'react-router-dom'
import CanvasDraw from 'react-canvas-draw'
import queryString from 'query-string'
import { Card, Typography, Button, Grid, CardContent, CardActions } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import AOS from 'aos';
import Comments from './comments'

const styles = {
  card: {
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
    borderRadius: 15,
    borderColor: "grey"
  },
  container: {
    flexGrow: 1,

  }
};

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
    AOS.init({
      duration: 1000
    });
    const { submissions, users, game, games, classes } = this.props
    if(!users.length || !games.length || !submissions.length) {return null}
    return (
    <Grid container className={classes.container} spacing={16} justify="center">
      <div>
        <Typography
          variant="h1"
        >
          Game Compilation
        </Typography>
        {

          submissions.map((submission,index) => (
            submission.drawingUrl
            ?
              <div
                key={submission.id}
                data-aos="fade-in"
                data-aos-duration="3000"
              >
                    <Card
                      className={classes.card}
                      raised={true}
                    >
                      <CardContent align="center">
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
                          <CardActions>
                            <Button
                              color="secondary"
                              onClick={()=> {this[submission.id].loadSaveData(submission.drawingUrl)}}
                            >
                              Play drawing
                            </Button>
                          </CardActions>
                        </div>
                        </CardContent>
                      </Card>
              </div>
            :
              <div
                key={submission.id}
                data-aos="fade-in"
                data-aos-duration="3000"
              >
                <Grid item xs={12}>
                    <Card className={classes.card} raised={true}>
                      {
                        index === 0 ?
                          <Typography>Starting Phrase:</Typography>
                          :
                          <Typography>
                            Phrase submission by {users.find(user => user.id === submission.userId).name}
                          </Typography>
                      }
                        <Typography
                          variant="h5"
                          key={submission.id}
                        >
                          {submission.phrase}
                        </Typography>
                      </Card>
                  </Grid>
                </div>
          ))
        }
        <Grid item xs={12}>
          <Comments />
        </Grid>
        <Link to='/selectplayers'>
          <Button
            color="primary"
            justify="center"
            variant="contained"
            className={classes.card}
            >
            Create Another Masterpiece
          </Button>
        </Link>
      </div>
      </Grid>
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
