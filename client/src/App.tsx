import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import webSocket from './utils/socket-client';


interface Props {}

const App: React.FC<Props> = (props) => {

  const [newMessage, setMessage] = useState('')
 
  const [allMessages, setAllMessages] = useState<string[]>([])


  webSocket.on('chat', (data: any) => {
    setAllMessages([...allMessages, data]);
  });

  const sendMessage = () => {
    console.log('SENT');

    webSocket.emit('chat', newMessage);

    setMessage('');
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <h2>Chat Messages</h2>
          <div>
            {
              allMessages.map((message: String, i: number) => {
                return <div key={`${i}-Z`}>{message}</div>
              })
            }
          </div>
          <input onChange={(e) => setMessage(e.target.value)} placeholder="type your message .." />
          <button onClick={() => sendMessage()}>↪</button>
        </div>
      </header>
    </div>
  );
}


export default App;
