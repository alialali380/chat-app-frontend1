import React from 'react';

interface Message {
  username: string;
  text?: string;
  mediaUrl?: string;
  isImage?: boolean;
  room: string;
}

interface ChatBoxProps {
  messages: Message[];
  username: string;
}

export default function ChatBox({ messages, username }: ChatBoxProps) {
  return (
    <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-50">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${msg.username === username ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-xs p-3 rounded-lg shadow-md ${
              msg.username === username
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 text-gray-800'
            }`}
          >
            <strong>{msg.username}</strong>
            {msg.text && <p className="mt-1">{msg.text}</p>}
            {msg.isImage && msg.mediaUrl && (
              <img src={msg.mediaUrl} alt="المرفق" className="mt-2 max-h-60 rounded" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}