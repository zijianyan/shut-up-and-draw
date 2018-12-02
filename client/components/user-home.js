import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import { Button, Typography, Card } from '@material-ui/core'

import Instructions from './instructions'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {name} = props

  return (
    <div>
      <Card align='center'>
        <Typography variant='h3'>Welcome, {name}</Typography>
        <Instructions />

        {/* placeholder until game is created */}
        <Link to='/selectplayers'>
        <Button type="submit" variant="contained" color="primary">Start Game</Button>
        </Link>
      </Card>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    name: state.user.name.split(" ")[0]
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  name: PropTypes.string
}
