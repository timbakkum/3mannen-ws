import { io } from "socket.io-client";

const socket = io("ws://localhost:3333", { autoConnect: false });

socket.on("connection", (socket) => {
  console.log(`connect ${socket.id}`);
});

socket.on("disconnect", () => {
  console.log(`disconnect`);
});

socket.onAny((...args) => {
  console.log('received event', args);
});

export default socket;
