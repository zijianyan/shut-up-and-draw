import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSubmissions } from '../store/submissions'
import { getGames } from '../store/games'
import { Link } from 'react-router-dom'
import CanvasDraw from 'react-canvas-draw'

import { Paper, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  card: {
    margin: 20,
    padding: 20,
    borderRadius: 15
  }
}

class Compilation extends Component {

  constructor(props){
    super(props)
    this.state = {}
    this.handlePlay = this.handlePlay.bind(this)
  }

  componentDidMount() {
    this.props.getSubmissions({id: this.props.gameId})
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
        <ul>
          {
            game.players.map(player => <li key={player}>{users.find(user => user.id === player).name}</li>)
          }
        </ul>
        <Paper className={classes.card}>
          <Typography>Paper Test</Typography>
        </Paper>
        {
          submissions.map((submission,index) => (
            submission.drawingUrl
            ? <div key={submission.id} >
              <label>Drawing submission by {users.find(user => user.id === submission.userId).name}</label>
              {/* <img key={submission.id} src={submission.drawingUrl}></img> */}
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
              <hr />
              </div>
            : <div key={submission.id}>
              {index === 0 ? <label>Starting Phrase:</label> : <label>Phrase submission by {users.find(user => user.id === submission.userId).name}</label>}
              <h4 key={submission.id} >{submission.phrase}</h4>
              <hr />
              </div>
          ))
        }
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
