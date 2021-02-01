
import io from 'socket.io-client';

import { WS_URL } from "constant";



const socket: SocketIOClient.Socket = io(`${WS_URL}`,
    { transports: ['websocket'] });



socket.on('connect', () => {
    console.log(socket.id);
});





export default socket;



