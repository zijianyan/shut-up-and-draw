import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSubmissions } from '../store/submissions'
import { getGames } from '../store/games'
import { Link } from 'react-router-dom'
import CanvasDraw from 'react-canvas-draw'
import queryString from 'query-string'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';



const styles = theme => ({

  Paper: {
    padding: theme.spacing.unit * 2,
    marginTop:10,
    marginBottom: 10,
    maxWidth: 400,


  },

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
    const { submissions, users, game, games } = this.props
    if(!users.length || !games.length || !submissions.length) {return null}

    return (
      <div>
        <h2>Game Compilation</h2>
        <Grid container spacing={16} justify="center">
        {

          submissions.map((submission,index) => (
            submission.drawingUrl
            ?<div key={submission.id} >
              <Grid item xs={12}>
              <Paper elevation={3}>
              <Typography variant="display1">Drawing submission by {users.find(user => user.id === submission.userId).name}</Typography>
              <div onMouseEnter={(event) => this.handlePlay(event,submission)} onClick={(event) => this.handlePlay(event,submission)}>
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
                <button onClick={()=> {
                    this[submission.id].loadSaveData(submission.drawingUrl)
                  }
                }>Play drawing</button>
              </div>
              </Paper>
              </Grid>
              </div>
            : <div key={submission.id}>
                <Grid xs={12}>
                  <Paper  elevation={3}>
                  {index === 0 ? <label>Starting Phrase:</label> : <label>Phrase submission by {users.find(user => user.id === submission.userId).name}</label>}
                  <Typography variant="display1" key={submission.id} >{submission.phrase}</Typography>
                   </Paper>
                </Grid>
              </div>
          ))
        }
        </Grid>
        <button><Link to='/selectplayers'>Play Again!</Link></button>
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
