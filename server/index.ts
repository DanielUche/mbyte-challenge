
import express from 'express';


import startDB from './utils/db-connector';
import routes from './routes';
import io from './utils/socket';


const app = express();
const server = require('http').createServer(app);

io.attach(server);

routes(app);
startDB(); //start database



const { SOCKET_PORT: socketPort, SERVER_PORT: serverPort } = process.env;

const SERVER_PORT = serverPort ? parseInt(serverPort as string, 10) : 3001;
const SOCKET_PORT = socketPort ? parseInt(socketPort as string, 10) : 5001;


io.listen(SOCKET_PORT);


server.listen(SERVER_PORT, () => {
  console.log(`Server is listening on port ${SERVER_PORT}`)
});