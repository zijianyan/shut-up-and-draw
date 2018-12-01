module.exports = (io) => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    let messages = [ // seeded messages
      {text: 'hello from the server!', id: Math.random()},
      {text: 'yep - a second seeded message', id: Math.random()},
    ];

    socket.on('newMessage', (message) => { // receive new message
      messages = [...messages, message]
      io.emit('messages', messages);
    })

    socket.emit('messages', messages) // emit seeded messages

    socket.on('disconnect', () => { // does this need a socket argument passed in?
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
  