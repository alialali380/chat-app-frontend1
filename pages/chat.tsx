import { useEffect, useState, useRef } from 'react';
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

  useEffect(() => {
    console.log("users" ,users)
    if (!room || !username) return;

    socket.emit('join_room', { username, room });

    // استقبال الرسائل السابقة
    socket.on('previous_messages', (msgs) => {
      setMessages(msgs);
    });

    // استقبال رسالة جديدة
    socket.on('new_message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // تحديث قائمة المستخدمين
    socket.on('users_list', (usersList) => {
      setUsers(usersList);
    });

    // عند انضمام مستخدم جديد
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
    <div className="flex h-screen">
      {/* قائمة المستخدمين */}
      <div className="w-1/4 bg-gray-200 p-4">
        <h2 className="font-bold mb-4">المستخدمون</h2>
        <UserList users={users} />
      </div>

      {/* نافذة الدردشة */}
      <div className="flex-1 flex flex-col">
        <ChatBox messages={messages} username={username as string} />
        <MessageInput
          room={room as string}
          username={username as string}
          onSend={sendMessage}
        />
      </div>
    </div>
  );
}