import {socket} from "../App";
import React, {useRef} from "react";

const Room = ({roomConfig, setRoomConfig, des}) => {

  const [message, setMessage] = React.useState('')
  const [maxUser, setMaxUser] = React.useState(roomConfig.max_user)
  const [roomType, setRoomType] = React.useState(roomConfig.room_type)

  const onMaxUserChange = e => {
    setMaxUser(Number(e.target.value))
  }

  const onRoomTypeChange = e => {
    setRoomType(e.target.value)
  }

  React.useEffect(() => {
    setRoomConfig(state => ({
      ...state,
      max_user: maxUser,
      room_type: roomType
    }))
  }, [maxUser, roomType])

  React.useEffect(() => {
    socket.emit('config room', roomConfig.code, roomConfig, () => {console.log('success')})
  }, [roomConfig.max_user, roomConfig.room_type])


  const onMessageChange = e => {
    setMessage(e.target.value)
  }

  const onMessageSent = () => {

    const encryptedMessage = des.encrypt(message)
    console.log('plain message : ', message)
    console.log('encrypted text : ', encryptedMessage)

    socket.emit('chat', roomConfig.code, encryptedMessage, message => {
      const plaintext = des.decrypt(message['content'])
      setRoomConfig(config => {
        return {
          ...config,
          messages: [
            ...config['messages'],
            {
              ...message,
              content: plaintext
            }
          ]
        }
      })
    })
  }

  const kick = socketId => {
    socket.emit('kick person', roomConfig.code, socketId, (status, data) => {
      if (status === 'error') {
        alert(data)
      } else if (status === 'success') {
        setRoomConfig(data)
      }
    })
  }

  const onLeave = () => {
    socket.emit('leave room', roomConfig.code)
    setRoomConfig(null)
  }
  return (
    <>
      <h4>You are joined room {roomConfig.code}</h4>
      <button onClick={onLeave}>leave</button>
      <div>
        <h5>Room Config</h5>
        <p>code : {roomConfig.code}</p>
        <div>
          max user : {socket.id === roomConfig.creator
            ? <select name="max_user" id="max_user" value={maxUser} onChange={onMaxUserChange}>
              <option value="-1">Infinity</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
            : maxUser === -1 ? 'Infinite' : maxUser}
        </div>
        <p>room type : {socket.id === roomConfig.creator
          ? <select name="room_type" id="room_type" value={roomType} onChange={onRoomTypeChange}>
            <option value="public">public</option>
            <option value="private">private</option>
          </select>
          : roomConfig.room_type}</p>
      </div>
      <div>
        <h5>List People</h5>
        {roomConfig.users.map(user => (
          <p key={user.id}>{user.username} {socket.id === roomConfig.creator && user.id !== socket.id && <button onClick={() => kick(user.id)}>kick</button>}</p>
        ))}
      </div>
      <div>
        <h5>CHat</h5>
        {roomConfig.messages.map(message => (
          <>
            <h6>{roomConfig.users.find(user => user.id === message.user)?.username}</h6>
            <p>{message.content}</p>
          </>
        ))}
        <input type="text" name='message' value={message} onChange={onMessageChange}/>
        <button onClick={onMessageSent}>send</button>
      </div>
    </>
  )
}

export default Room