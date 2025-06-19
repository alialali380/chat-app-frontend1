import React, { useState } from 'react';

interface Props {
  room: string;
  username: string;
  onSend: (message: any) => void;
}

export default function MessageInput({ room, username, onSend }: Props) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const message = {
      username,
      room,
      text,
    };

    onSend(message);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
      <div className="flex">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="اكتب رسالتك..."
          className="flex-1 p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition-colors"
        >
          إرسال
        </button>
      </div>
    </form>
  );
}