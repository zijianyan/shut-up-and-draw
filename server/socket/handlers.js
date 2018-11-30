function handleEvent(chatroomName, createEntry) {
  return ensureValidChatroomAndUserSelected(chatroomName)
    .then(function ({ chatroom, user }) {
      // append event to chat history
      const entry = { user, ...createEntry() }
      chatroom.addEntry(entry)

      // notify other clients in chatroom
      chatroom.broadcastMessage({ chat: chatroomName, ...entry })
      return chatroom
    })
  }
  return handleEvent
}



 function handleMessage({ chatroomName, message } = {}, callback) {
  const createEntry = () => ({ message })

  handleEvent(chatroomName, createEntry)
    .then(() => callback(null))
    .catch(callback)
}


module.exports = {handleMessage}
