import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

import { Button } from '@material-ui/core'

import { Link } from 'react-router-dom';

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <div style={{ display: 'flex', maxWidth: '100%', }}>
        <div>
        <img src={'/logo-small.png'} style={{ flex: 1 }}/>
        </div>
      </div>
      <form onSubmit={handleSubmit} name={name}>
        { name === 'signup'
        ? (
          <Fragment>
          <div>
            <label htmlFor="username">
              <small>Name</small>
            </label>
            <input name="username" type="text" />
            </div>
            <div>
            <label htmlFor="phoneNumber">
              <small>Phone Number</small>
            </label>
            <input name="phoneNumber" type="text" />
            </div>
          </Fragment>
        ) : null
      }
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <Button type="submit" variant="contained" color="primary">{displayName}</Button>
          {
            props.name === 'login'
              ? <Button component={Link} to='/signup'variant="contained" color="secondary">Sign Up</Button>
              : null
          }
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>


    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatchLogIn = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

const mapDispatchSignUp = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const username = evt.target.username.value
      const phoneNumber = evt.target.phoneNumber.value
      dispatch(auth(email, password, formName, username, phoneNumber))
    }
  }
}

export const Login = connect(mapLogin, mapDispatchLogIn)(AuthForm)
export const Signup = connect(mapSignup, mapDispatchSignUp)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}





/* //Removed OAuth links:
      <div>
        <a href="/auth/google">{displayName} with Google</a>
      </div>
      <div>
        <a href="/auth/facebook">{displayName} with Facebook</a>
      </div>
*/