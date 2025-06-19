import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3001'; // عنوان السيرفر

export const socket: Socket = io(SOCKET_URL, {
  reconnection: true,
  reconnectionAttempts: Infinity,
});