
import React, { Component, Fragment } from 'react';
import io from 'socket.io-client'
import AddMessage from './AddMessage'
import MessagesList from './MessageList'
import Comment from './Comment'


import {EventEmitter} from 'events'
const events = new EventEmitter()
const socket = io(window.location.origin)

class Chat extends Component {
  constructor() {
    super()
    this.state = {
      messages: [],
      text: ''
    }
  }

  componentDidMount() {
    socket.on('connect', (socket)=> {
      console.log('established socket connection to server');
    });
    socket.on('messages', messages => {
      this.setState({ messages })
    })
    events.on('newMessage', message => {
      socket.emit('newMessage', message);
    });
  }

  handleSend = (event) => {
    event.preventDefault()
    const message = {text: this.state.text, id: Math.random()}
    socket.emit('newMessage', message);
    this.setState({ text: '' });
  }

  handleChange = (ev) => {
    this.setState({ text: ev.target.value })
  }

  render(){
    const { messages, text } = this.state
    const { handleChange, handleSend } = this
    return (
      <div id="container">
        <section >
          <h1>Comments</h1>
          <section id="comments-list">
            <ul>
              {messages.map(message => ( <Comment key={message.id} message={message}/> ))}
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
