
import React, { Component, Fragment } from 'react';
import socket from '../../socket.js'
import AddMessage from './AddMessage'
import MessagesList from './MessageList'

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
      <div id="container">
        <section >
          <MessagesList />
          <AddMessage />
        </section>
      </div>
    )
  }
}

const mapStateToProps = ({comments}) => {
  return {

  }
}
