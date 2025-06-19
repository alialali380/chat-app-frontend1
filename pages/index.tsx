import { useState } from 'react';
import { useRouter } from 'next/router';
import { socket } from '../utils/socket';

export default function Home() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('general');
  const router = useRouter();

  const handleJoin = () => {
    if (username && room) {
      // socket.emit('join_room', { username, room });
      router.push(`/chat?room=${room}&username=${username}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">انضم إلى غرفة</h1>
        <input
          type="text"
          placeholder="اسمك"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="text"
          placeholder="اسم الغرفة"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button
          onClick={handleJoin}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          دخول
        </button>
      </div>
    </div>
  );
}