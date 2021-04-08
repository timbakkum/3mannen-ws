import React, { ReactElement, useEffect, useState } from 'react'
import socket from './../client';

interface Props {

}

export function UserList({ }: Props): ReactElement {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("users", (users) => {
      console.log(users)
      users.forEach((user) => {
        user.self = user.userID === socket.id;
      });
      // put the current user first, and then sort by username
      setUsers(users.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      }));
    });

    socket.on("user connected", (user) => {
      setUsers((currentUsers) => [...currentUsers, user])
    })

    // TODO add .off
  }, [])


  return (
    <div>
      <h2>De grote spelers</h2>
      {users?.length > 0 ? (
        <ul>
          {users?.map(user => (
            <li key={user.userID}>{user.userName}</li>
          ))}
        </ul>
      ) : 'Misschien eerst even je naam invullen, m\'n jongen!'}
    </div>
  )
}
