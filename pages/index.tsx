// Home.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { FaUser, FaComments, FaSignInAlt } from 'react-icons/fa'; 

export default function Home() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('general');
  const router = useRouter();

  const handleJoin = () => {
    if (username.trim() && room.trim()) {
      router.push(`/chat?room=${encodeURIComponent(room)}&username=${encodeURIComponent(username)}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-white to-blue-100 p-4 transition-all duration-500">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <h1 className="text-3xl font-extrabold text-center text-green-600 mb-6">انضم إلى غرفة</h1>
        
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">اسمك</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <FaUser />
            </span>
            <input
              type="text"
              placeholder="أدخل اسمك"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">اسم الغرفة</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <FaComments />
            </span>
            <input
              type="text"
              placeholder="مثال: عام"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
            />
          </div>
        </div>

        <button
          onClick={handleJoin}
          disabled={!username || !room}
          className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-white font-semibold text-lg transition-all duration-300 ${
            username && room
              ? 'bg-green-500 hover:bg-green-600 transform hover:scale-105'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          <FaSignInAlt /> دخول إلى الغرفة
        </button>
      </div>
    </div>
  );
}