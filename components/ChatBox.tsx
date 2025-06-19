import React from 'react';

// تعريف نوع البيانات
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

const ChatBox: React.FC<ChatBoxProps> = ({ messages, username }) => {
  return (
    <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-100">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex items-end ${msg.username === username ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-xs sm:max-w-sm md:max-w-md px-4 py-3 rounded-t-xl rounded-l-xl shadow-md transition-transform transform hover:scale-105 ${
              msg.username === username
                ? 'bg-green-500 text-white rounded-br-none'
                : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
            }`}
          >
            {/* اسم المرسل */}
            <div className="text-xs font-semibold mb-1 opacity-90">
              {msg.username}
            </div>

            {/* نص الرسالة */}
            {msg.text && <p className="break-words">{msg.text}</p>}

            {/* مرفقات (صور أو فيديو) */}
            {msg.mediaUrl && (
              <div className="mt-2">
                {msg.isImage ? (
                  <img
                    src={msg.mediaUrl}
                    alt="مرفق"
                    className="rounded-lg max-h-60 w-auto object-cover"
                  />
                ) : (
                  <video
                    src={msg.mediaUrl}
                    controls
                    className="rounded-lg max-h-60 w-auto object-cover"
                  />
                )}
              </div>
            )}

            {/* وقت الرسالة - يمكنك استبدال الوقت الحقيقي لاحقاً */}
            <div className={`text-[10px] mt-1 text-right opacity-70 ${msg.username === username ? 'text-white' : 'text-gray-500'}`}>
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatBox;