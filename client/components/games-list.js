import React, { Component } from 'react'
import { connect } from 'react-redux'
import GamePreview from './game-preview'
import { Link } from 'react-router-dom'
import { Button, Grow, Switch, Grid } from '@material-ui/core'


class GamesList extends Component {

  render(){
    const { games } = this.props


    if(!this.props.games) { return null }

    return (
      <div>

        <h1>Games List</h1>

        <Link to='/selectplayers'>
          <Button color="primary" variant="contained">
            Start a new game!
          </Button>
        </Link>
        <div>
          {
            games.map(game => {
              return (
                <div key={game.id}>
                <Grid item xs>
                  <Grow in>
                    <GamePreview key={game.id} game={game} />
                  </Grow>
               </Grid>
              </div>
            )})
          }
        </div>

      </div>
    )
  }
}

const mapStateToProps = ({games}) => {
  return {
    games
  }
}


export default connect(mapStateToProps)(GamesList)
