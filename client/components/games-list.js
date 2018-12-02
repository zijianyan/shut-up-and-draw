import React, { Component } from 'react'
import { connect } from 'react-redux'
import GamePreview from './game-preview'
import { Grid, Tab, Tabs, AppBar } from '@material-ui/core'


class GamesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render(){
    const { games } = this.props
    const { value } = this.state

    if(!this.props.games) { return null }

    const gameMap = (status) => {
      return games.map( game => {
        if(status === 'all') return <GamePreview key={game.id} game={game}/>
        if(game.status === status) return <GamePreview key={game.id} game={game}/>
      })
    }

    return (
      <div>
        <AppBar
          position="static"
          color="default"
        >
          <Tabs
            centered
            value={value}
            onChange={this.handleChange}
          >
            <Tab label="All"/>
            <Tab label="Active"/>
            <Tab label="Complete"/>
          </Tabs>
        </AppBar>
        <Grid
          container spacing={24}
          align="center"
          justify="center"
        >
            { value === 0 && gameMap('all')}
            { value === 1 && gameMap('active')}
            { value === 2 && gameMap('complete')}
        </Grid>
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

// <Link to='/selectplayers'>
// <Button color="primary" variant="contained">
//   Start a new game!
// </Button>
// </Link>
