import * as express from 'express';
import { createServer } from 'http';
import * as cors from 'cors';
import { Server, Socket } from 'socket.io';

// const app = express();
// app.use(cors())
const httpServer = createServer();


const port = process.env.port || 3333;


const io = new Server(httpServer, {
  cors: {
    origin: '*',
  }
});

io.use((socket, next) => {
  const userName = socket.handshake.auth.userName;
  if (!userName) {
    console.log(socket.handshake.auth, 'invalid username!')
    return next(new Error("invalid username"));
  }
  socket.userName = userName; // nodig?
  next();
});

io.on("connection", (socket: Socket) => {
  console.log('connected id', socket.id, socket.handshake.auth);

  socket.broadcast.emit("user connected", {
    userID: socket.id,
    userName: socket.userName
  });

  socket.on("ping", (cb) => {
    console.log("ping");
    cb();
  });

  socket.on("disconnect", () => {
    console.log(`disconnect ${socket.id}`);
  });

  socket.on("dice throw", (res) => {
    console.log('a dice was thrown', res)
    io.emit("dice thrown", res);
  });

  const users = [];
  // console.log(socket);
  for (const [id, s] of io.of("/").sockets) {
    users.push({
      userID: id,
      userName: s.userName,
    });
  }
  socket.emit("users", users);
});

httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
