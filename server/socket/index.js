module.exports = (io) => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    let messages = [ // seeded messages
      {text: 'Incredible! Haha', id: Math.random(), author: 'Anonymous Dolphin'},
      {text: 'How did that even happen?', id: Math.random(), author: 'Anonymous Oxen'},
    ];

    socket.on('newMessage', (message) => { // receive new message
      messages = [...messages, message]
      io.emit('messages', messages) // emit seeded messages
    })

    socket.emit('messages', messages) // emit seeded messages

    socket.on('disconnect', () => { // does this need a socket argument passed in?
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
