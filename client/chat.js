
import React, { Component, Fragment } from 'react';
import socket from './socket.js'

class Comments extends Component {
  constructor() {
    super()
    this.state = {
      message: ''
    }
  }

  handleSend = () => {

  }

  handleChange = (ev) => {
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }

  render(){
    return (
      <div>
      <form onSubmit={this.handleSend}>
        <input
          name='message'
          value={this.state.message}
          onChange={this.handleChange}
        />
        <button type="submit">
          Send Comment
        </button>
      </form>
      </div>
    )
  }
}
