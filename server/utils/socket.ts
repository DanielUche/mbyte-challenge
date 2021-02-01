import * as socketio from 'socket.io';
import { IProduct } from '../database/models/products';

const io: socketio.Server = new socketio.Server();
let socket: any;

export interface ICartItem {
  [key: string]: number
}


io.on('connection', (client: socketio.Socket) => {
  console.log(`user ${client.id}  connected`);

  client.on('add-cart-item', (data: IProduct) => {
    client.broadcast.emit('add-cart-item-ack',
      {
        msg: `${data.name} quantity decremented by 1`,
        data
      });
  });

  client.on('remove-cart-item', (data: IProduct) => {
    client.broadcast.emit('remove-cart-item-ack',
      {
        msg: `${data.name} quantity incremented by 1`,
        data
      });
  });
})

  export const connectedInstace = () => {
    return socket;
  };

  export default io;