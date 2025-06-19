import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'https://chat-app-backend1-1.onrender.com/'; 

export const socket: Socket = io(SOCKET_URL, {
  reconnection: true,
  reconnectionAttempts: Infinity,
});