import JoinForm from "./JoinForm";
import {socket} from "../App";
import React from "react";
import room from "./Room";

const MainMenu = ({setRoomConfig}) => {

  const [username, setUsername] = React.useState('')
  const [roomCode, setRoomCode] = React.useState('')

  const onUnameChange = e => {
    setUsername(e.target.value)
  }

  const onRoomCodeChange = e => {
    setRoomCode(e.target.value)
  }

  const onCreateRoom = () => {
    socket.emit('create room', username, (roomCode, roomConfig) => {
      setRoomConfig({
        code: roomCode,
        ...roomConfig
      })
    })
  }

  const onJoinRoom = e => {
    e.preventDefault()
    socket.emit('join room', roomCode, username, null, (roomCode, status, data) => {
      if (status === 'success') {
        setRoomConfig({
          code: roomCode,
          ...data
        })
      } else if (status === 'error') {
        alert(`cannot join to room ${roomCode} : ${data}`)
      }
    })
  }

  return (
    <div>
      <input type="text" placeholder='username' name='username' value={username} onChange={onUnameChange}/>
      <br/>
      <button onClick={onCreateRoom}>create room</button>
      <p>or</p>
      <h5>Join Room</h5>
      <form action="/" onSubmit={onJoinRoom}>
        <input type="text" placeholder='roomCode' name='roomCode' value={roomCode} onChange={onRoomCodeChange}/>
        <button type="submit">join</button>
      </form>
    </div>
  )
}

export default MainMenu