
import React, { Component, Fragment } from 'react';
// import socket from '../../socket'
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
      console.log('client establishing connectionnnnnnn.....');

    });

    // events.on('messages', messages => {
    //   socket.emit('new
    // })

    socket.on('messages', messages => {
      console.log('messages received!', messages)
      this.setState({
        messages
      })
      // socket.emit('newMessages', this.state.messages)
    })

    events.on('newMessage', message => {
      socket.emit('newMessage', message);
    });
  }

  handleSend = (event) => {
    event.preventDefault()
    const message = {text: this.state.text, id: Math.random()}

    socket.emit('newMessage', message);

    // socket.on('newMessage', message => { //events.on?
    //   console.log('handleSend, socket.on....emitting...');
    //   socket.emit('newMessage', message)
    // })
    this.setState({
      // messages: [...this.state.messages, message], // send single message or entire messages array?
      text: ''
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
    console.log('window.location:', window.location);
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
