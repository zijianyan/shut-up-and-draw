import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

import { Button, TextField, Card } from '@material-ui/core'

import { Link } from 'react-router-dom';

// const styles = theme => ({
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   textField: {
//     marginLeft: theme.spacing.unit,
//     marginRight: theme.spacing.unit,
//     width: 200,
//   },
//   dense: {
//     marginTop: 19,
//   },
//   menu: {
//     width: 200,
//   },
// });

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props
  console.log('window url ', window.location)

  return (
    <div>
      <Card align='center' elevation={9} style={{ margin: 30, padding: 20, borderRadius: 15}}>


      <img src={'/logo-small.png'}/>


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
          <TextField
            name='email'
            type='text'
            label="Email"
            placeholder="Email"
            // className={classes.textField}
            style={{ width: 200 }}
            margin="normal"
          />
        </div>
        <div>
          <TextField
            name='password'
            type='password'
            label="Password"
            placeholder="Password"
            // className={classes.textField}
            style={{ width: 200 }}
            margin="normal"
          />
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

      </Card>
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

