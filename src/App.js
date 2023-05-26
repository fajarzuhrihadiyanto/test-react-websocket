import React from "react";
import * as socketIO from "socket.io-client";
import MainMenu from "./features/MainMenu";
import Room from "./features/Room";

export const socket = socketIO.connect('http://localhost:3000');

function App() {

  const [roomConfig, setRoomConfig] = React.useState(null)

  React.useEffect(() => {

    socket.once('connect', () => {
      console.log(socket)
    })

    socket.on('new room config', roomConfig => {
      setRoomConfig(roomConfig)
    })

    socket.on('joined room', roomConfig => {
      setRoomConfig(roomConfig)
    })

    socket.on('leaved room', roomConfig => {
      setRoomConfig(roomConfig)
    })

    socket.on('kicked', roomCode => {
      setRoomConfig(null)
      alert(`you are kicked from room ${roomCode}`)
    })

    socket.on('someone kicked', roomConfig => {
      setRoomConfig(roomConfig)
    })

    socket.on('new chat', roomConfig => {
      setRoomConfig(roomConfig)
    })
  }, [])

  return (
    <div className="App">
      {roomConfig !== null
      ? <Room roomConfig={roomConfig} setRoomConfig={setRoomConfig}/>
      : <MainMenu setRoomConfig={setRoomConfig}/>}
    </div>
  );
}

export default App;
