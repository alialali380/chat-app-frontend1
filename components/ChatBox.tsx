import React from "react";

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
    <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-100 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex items-start gap-2 ${
            msg.username === username ? "justify-end" : "justify-start"
          }`}
        >
          {/* صورة المرسل (يمكن استبدالها بملف شخصي حقيقي لاحقاً) */}
          {msg.username !== username && (
            <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-sm font-bold text-blue-700">
              {msg.username.charAt(0).toUpperCase()}
            </div>
          )}

          <div
            className={`min-w-[140px] max-w-xs sm:max-w-sm md:max-w-md px-4 py-2.5 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md ${
              msg.username === username
                ? "bg-green-500 text-white rounded-br-none"
                : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
            }`}
          >
            {/* اسم المرسل */}
            <div className="text-xs font-semibold mb-1 opacity-90">
              {msg.username !== username && msg.username}
            </div>

            {/* نص الرسالة */}
            {msg.text && <p className="break-words text-sm">{msg.text}</p>}

            {/* وقت الرسالة */}
            <div
              className={`text-[10px] mt-1 text-right opacity-70 ${
                msg.username === username ? "text-white" : "text-gray-500"
              }`}
            >
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>

          {msg.username === username && (
            <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center text-sm font-bold text-green-700">
              👤
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatBox;
