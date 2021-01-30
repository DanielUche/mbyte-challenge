import * as socketio from 'socket.io';


const io: socketio.Server = new socketio.Server();
let socket: any;

io.on('connection', (client: socketio.Socket) => {
  console.log('user connected');
  socket = client;
});

export const connectedInstace = () => {
  return socket;
};


export default io;