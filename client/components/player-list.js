import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const PlayerList = props => {
  const {user, players} = props

  return (
    <div>
    <h1>Select Players</h1>
    </div>
  );
}

const mapState = ({user, users}) => {
  return {
    user,
    players: users //players can be replaced at later time with explicit friend, right now using all users for simplicity
  }
}

export default connect(mapState)(PlayerList)

/**
 * PROP TYPES
 */
PlayerList.propTypes = {
  players: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
}
