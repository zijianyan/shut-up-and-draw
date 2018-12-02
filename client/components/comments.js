
import React, { Component, Fragment } from 'react';
import io from 'socket.io-client'
import Comment from './comment'
import { Card, Typography, Button, Grid, Zoom, CardContent, CardActions, TextField, CardHeader } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'


import {EventEmitter} from 'events'
const socket = io(window.location.origin)

const styles = {
  card: {
    padding: 20,
    margin: 20,
    borderRadius: 15,
    borderColor: "grey"
  },
  textField: {
    display: 'inline-block'
  }
}

class Comments extends Component {
  constructor() {
    super()
    this.state = {
      messages: [],
      text: '',
      author: ''
    }
  }

  componentDidMount() {
    socket.on('connect', (socket)=> {
    });
    socket.on('messages', messages => {
      this.setState({ messages })
    })
    socket.on('newMessage', message => {
      socket.emit('messages', {messages: [...this.state.messages, message]});
    });
  }

  handleSend = (event) => {
    event.preventDefault()
    const message = {text: this.state.text, id: Math.random(), author: this.state.author.length ? this.state.author : 'Anonymous Dolphin'}
    socket.emit('newMessage', message);
    this.setState({ text: ''});
  }

  handleChange = (ev) => {
    this.setState({ [ev.target.name]: ev.target.value })
  }

  render(){
    const { messages, text, author } = this.state
    const { handleChange, handleSend } = this
    const { classes } = this.props
    if(!messages.length) return null

    return (
      <Card id="container">
        <CardContent className={classes.card}>
          <CardHeader title='Comments'></CardHeader>
          <CardContent>
            <TextField
              name='author'
              value={author}
              onChange={handleChange}
              placeholder="Your name here"
            />
          </CardContent>
          <CardContent id="comments-list">
            <div>
              {messages.map(message => ( <Comment key={message.id} message={message}/> ))}
            </div>
          </CardContent>
          <CardContent id="new-message">
          <TextField
              id="outlined-textarea"
              label="Speak your heart"
              placeholder="Speak your heart"
              multiline
              variant="outlined"
              name='text'
              value={text}
              onKeyPress={(e) => { if (e.key === 'Enter') {handleSend(e)} }}
              onChange={handleChange}
            />
            <Button
              onClick={handleSend}
            >Send</Button>
          </CardContent>
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(styles)(Comments)
