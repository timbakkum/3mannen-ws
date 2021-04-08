import React, { ReactElement, useState } from 'react'
import socket from './../client';

interface Props {

}

export default function NameForm({ }: Props): ReactElement {
  const [name, setName] = useState<string>("");

  function handleChange(event) {
    setName(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // submit name to socket
    socket.auth = { userName: name };
    socket.connect();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" placeholder="Menno de Roller" value={name} onChange={handleChange} />
      <button type="submit">Lekker spelen!</button>
    </form>
  )
}
