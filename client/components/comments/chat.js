
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
    socket.on('messages', messages => {
      console.log('messages received!', messages)
      this.setState({
        messages
      })
      socket.emit('newMessages', this.state.messages)
    })
  }

  handleSend = (event) => {
    event.preventDefault()
    const message = {text: this.state.text, id: Math.random()}
    this.setState({
      messages: [...this.state.messages, message],
      text: ''
    })
    socket.on('newMessage', message => {
      socket.emit('newMessage', message)
    })
  }

  handleChange = (ev) => {
    this.setState({
      text: ev.target.value
    })
  }

  render(){
    const { messages, text } = this.state
    const { handleChange, handleSend } = this
    console.log('Chat, this.state:', this.state);

    return (
      <div id="container">
        <section >
          <h1>Comments</h1>
          <section id="comments-list">
            <ul>
            {messages.map(message => (
              <li key={message.id}>
                {message.text}
              </li>
            ))}
            </ul>
          </section>
          <section id="new-message">
            <input name='comment' value={text}
              onKeyPress={(e) => { if (e.key === 'Enter') {handleSend(e)} }}
              onChange={handleChange}
            />
            <button onClick={handleSend}>Send</button>
          </section>
        </section>
      </div>
    )
  }
}

export default Chat
