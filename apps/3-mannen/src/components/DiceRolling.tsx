import React, { ReactElement, useEffect, useState } from 'react'
import socket from './../client';

interface Props {

}

function getDiceResult(max = 6, min = 1) {
  const r = Math.random() * (max - min) + min
  return Math.ceil(r)
}

export function DiceRolling({ }: Props): ReactElement {

  const [throws, setThrows] = useState([]);
  useEffect(() => {
    socket.on("dice thrown", (res) => {
      setThrows((currentThrows) => [res, ...currentThrows]);
    });
  }, [])

  function handleDiceThrow() {
    const n1 = getDiceResult();
    const n2 = getDiceResult();

    socket.emit("dice throw", {
      userID: socket.id,
      userName: socket.auth.userName,
      n1,
      n2
    })
  }

  return (
    <div>
      {socket.connected && (
        <>
          <button onClick={handleDiceThrow}>
            Lekker dobbelen
        </button>
          <h2>Dobbellog</h2>
          {throws?.map((t, i) => (
            <li key={i}>
              <p>dobbelaar: {t.userName}</p>
              <p>D1: {t.n1}</p>
              <p>D2: {t.n2}</p>
            </li>
          ))}
        </>
      )}

    </div>
  )
}
