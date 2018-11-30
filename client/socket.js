import io from 'socket.io-client'

const socket = io(window.location.origin)

socket.on('connect', () => {

  console.log('Connected!')

  socket.on('message', (data) => {
    data.message
  })
})

export default socket
