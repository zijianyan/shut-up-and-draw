module.exports = io => {

  const messages = [
    {text: 'hello from server/socket/index.js!', id: Math.random()},
    {text: 'yep - a second seeded message', id: Math.random()},
  ];

  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    socket.emit('messages', messages)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
