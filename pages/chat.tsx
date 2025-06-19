import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { socket } from '../utils/socket';
import ChatBox from '../components/ChatBox';
import MessageInput from '../components/MessageInput';
import UserList from '../components/UserList';

export default function ChatPage() {
  const router = useRouter();
  const { room, username } = router.query;
  const [messages, setMessages] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [showUserList, setShowUserList] = useState(false); // للتحكم بعرض القائمة

  useEffect(() => {
    if (!room || !username) return;

    socket.emit('join_room', { username, room });

    router.push(`/chat?room=${room}&username=${username}`, undefined, { shallow: true });

    socket.on('previous_messages', (msgs) => {
      setMessages(msgs);
    });

    socket.on('new_message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on('users_list', (usersList) => {
      setUsers(usersList);
    });

    socket.on('user_joined', (user) => {
      console.log(`${user.username} انضم`);
    });

    return () => {
      socket.off('previous_messages');
      socket.off('new_message');
      socket.off('users_list');
      socket.off('user_joined');
    };
  }, [room, username]);

  const sendMessage = (message: any) => {
    socket.emit('send_message', message);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header يظهر دائمًا - عرض اسم الغرفة */}
      <div className="flex items-center justify-between p-3 md:p-4 bg-white border-b border-gray-200 shadow-sm">
        <h1 className="text-lg md:text-xl font-bold text-green-600 truncate">
          الغرفة: {room}
        </h1>

        {/* زر إظهار المستخدمين فقط على الجوال */}
        <button
          onClick={() => setShowUserList(true)}
          className="md:hidden px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          المستخدمون
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">

        {/* قائمة المستخدمين - ظاهرة دائمًا على MD فأعلى، ويمكن إخفاؤها على الجوال */}
        <div
          className={`${
            showUserList ? 'block' : 'hidden'
          } md:block fixed md:relative inset-0 md:inset-auto z-30 md:z-0 w-full md:w-1/4 max-h-screen bg-white shadow-lg border-r border-gray-200 transition-transform duration-300 ease-in-out`}
        >
          <div className="p-4 h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              {/* <h2 className="text-xl font-bold text-green-600">المستخدمون المتصلون</h2> */}
              
              {/* زر الإغلاق فقط على الجوال */}
              <button
                onClick={() => setShowUserList(false)}
                className="md:hidden text-gray-500 hover:text-gray-800"
                aria-label="إغلاق"
              >
                &times; {/* رمز X */}
              </button>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-gray-100">
              <UserList users={users} />
            </div>
          </div>
        </div>

        {/* نافذة الدردشة */}
        <div className="flex-1 flex flex-col bg-white shadow-lg rounded-tl-2xl overflow-hidden">
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <ChatBox messages={messages} username={username as string} />
          </div>
          <div className="border-t border-gray-200 bg-gray-50">
            <MessageInput
              room={room as string}
              username={username as string}
              onSend={sendMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}