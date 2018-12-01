
import React, { Component, Fragment } from 'react';
import socket from '../../socket'
import AddMessage from './AddMessage'
import MessagesList from './MessageList'
import Comment from './Comment'

class Chat extends Component {
  constructor() {
    super()
    this.state = {
      messages: [],
      text: ''
    }
  }

  componentDidMount() {
    socket.on('messages', (obj) => {
      console.log('message received!', obj)
      this.setState({
        messages: [...this.state.messages, obj]
      })
      socket.emit('newMessages', this.state.messages)
    })
  }

  handleSend = (event) => {
    event.preventDefault()
    const message = {text: this.state.text, id: Math.random()}
    this.setState({
      messages: [...this.state.messages, obj]
    })
    socket.on('newMessage', (obj) => {
      socket.emit('newMessage', message)
    })
  }

  handleChange = (ev) => {
    this.setState({
      text: ev.target.value
    })
  }

  render(){
    const { messages } = this.state
    return (
      <div id="container">
        <section >
        <section id="comments-list">
          <ul>
          {messages.map(message => (
            <Comment
            key={message.id} message={message}
            />
          ))}
          </ul>
        </section>
          <section id="new-message">
            <input name='comment' value={this.state.text}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  this.handleSend(e)
                  this.setState({
                    text: ''
                  })
                }
              }}
              onChange={this.handleChange}
            />
          </section>
        </section>
      </div>
    )
  }
}

export default Chat
