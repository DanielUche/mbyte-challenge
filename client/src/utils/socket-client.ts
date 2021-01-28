
import io from 'socket.io-client';


const socket: SocketIOClient.Socket = io('http://localhost:5000',
    { transports: ['websocket'] });

export default socket;



