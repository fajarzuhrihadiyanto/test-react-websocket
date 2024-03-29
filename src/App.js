import React from "react";
import * as socketIO from "socket.io-client";
import MainMenu from "./features/MainMenu";
import Room from "./features/Room";
import DES from './utils/des';

export const socket = socketIO.connect('http://localhost:3000');

const des = new DES('loremips')
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

    socket.on('new chat', message => {
      const plaintext = des.decrypt(message['content'])
      console.log('encrypted text : ', message['content'])
      console.log('plain text : ', plaintext)
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
  }, [])

  return (
    <div className="App">
      {roomConfig !== null
      ? <Room roomConfig={roomConfig} setRoomConfig={setRoomConfig} des={des}/>
      : <MainMenu setRoomConfig={setRoomConfig}/>}
    </div>
  );
}

export default App;
