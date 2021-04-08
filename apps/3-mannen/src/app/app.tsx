import React, { useEffect, useState } from 'react';
import { DiceRolling } from '../components/DiceRolling';
import NameForm from '../components/NameForm';
import { UserList } from '../components/UserList';
import socket from './../client';

export const App = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {

    socket.on("connect", (e) => {
      console.log(e)
      setIsConnected(true);
    });
  }, [])

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Welcome to 3-mannen!</h1>
      {!isConnected ? <NameForm /> : 'Je bent erbij!'}
      <UserList />
      <DiceRolling />
    </div>
  );
};

export default App;
