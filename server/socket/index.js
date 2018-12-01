// module.exports = (io) => {

//   const messages = [
//     {text: 'hello from server/socket/index.js!', id: Math.random()},
//     {text: 'yep - a second seeded message', id: Math.random()},
//   ];

//   io.on('connection', socket => {
//     console.log(`A socket connection to the server has been made: ${socket.id}`)
//     socket.emit('messages', messages)

//     socket.on('disconnect', () => {
//       console.log(`Connection ${socket.id} has left the building`)
//     })
//   })
// }



module.exports = (io) => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    let messages = [ // seeded messages
      {text: 'hello from the server!', id: Math.random()},
      {text: 'yep - a second seeded message', id: Math.random()},
    ];

    socket.on('connect', ()=> {
      socket.emit('messages', messages) // attempt to emit seeded messages, or current sta
    });

    socket.on('newMessage', (message) => { // receive new message
      console.log('new message:', message)
      messages = [...messages, message]
      console.log('newMessages:', messages)

      io.emit('messages', messages);
    })

    socket.emit('messages', messages) // attempt to emit seeded messages, or current state of messages
    socket.on('disconnect', () => { // does this need a socket argument passed in?
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
  