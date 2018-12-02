import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import { Button, TextField, Card, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom';

/**
 * COMPONENT
 */
const AuthForm = props => {

  const {name, displayName, handleSubmit, error, classes} = props
  console.log('window url ', window.location)

  return (
    <div>
      <Grid container justify="center">
      <Card align='center' elevation={9} style={{ margin: 30, padding: 20, borderRadius: 15}}>

      <img src={'/logo-small.png'}/>
      <Grid item xs={3}>
        <form onSubmit={handleSubmit} name={name}>
          { name === 'signup'
          ? (
            <Fragment>
              <div>
                <TextField
                  name='username'
                  type='text'
                  label="Name"
                  placeholder="Name"
                  style={{ width: 200 }}
                  margin="normal"
                />
              </div>
              <div>
                <TextField
                  name='phoneNumber'
                  type='text'
                  label="Phone Number"
                  placeholder="+10000000000"
                  style={{ width: 200 }}
                  margin="normal"
                />
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
              style={{ width: 200 }}
              margin="normal"
            />
          </div>
          <div>
            <Button type="submit" variant="contained" color="primary" style={{padding: 10, margin:10}}>{displayName}</Button>
            {
              props.name === 'login'
                ? <Button component={Link} to='/signup'variant="contained" color="secondary">Sign Up</Button>
                : null
            }
          </div>
          {error && error.response && <div> {error.response.data} </div>}

        </form>
      </Grid>
        <div>
          <Button>
            <a href="/auth/google">{displayName} with Google</a>
          </Button></div>
        <div>
          <Button>
            <a href="/auth/facebook">{displayName} with Facebook</a>
          </Button>
          <Button type="submit" variant="contained" color='primary'>{displayName}</Button>
        </div>
      </Card>
      </Grid>
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








