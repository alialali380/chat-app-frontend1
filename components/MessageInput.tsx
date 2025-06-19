import React, { useState, useRef } from 'react';

interface Props {
  room: string;
  username: string;
  onSend: (message: any) => void;
}

export default function MessageInput({ room, username, onSend }: Props) {
  const [text, setText] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() && !preview) return;

    const message = {
      username,
      room,
      text,
      mediaUrl: preview || undefined,
      isImage: preview?.startsWith('data:image') || false,
    };

    onSend(message);

    // إعادة تعيين الحقول
    setText('');
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Image = event.target?.result as string;
      setPreview(base64Image);
    };
    reader.readAsDataURL(file);
  };

  const removePreview = () => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
      {/* حقل النص والملف */}
      <div className="flex items-center mb-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="اكتب رسالتك..."
          className="flex-1 p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*,video/*"
          className="hidden"
          id="file-upload"
          onChange={handleFileChange}
        />
        <label htmlFor="file-upload" className="bg-gray-200 px-3 py-2 cursor-pointer hover:bg-gray-300">
          📎
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition-colors"
        >
          إرسال
        </button>
      </div>

      {/* معاينة الصورة أو الفيديو */}
      {preview && (
        <div className="relative mt-2 max-w-xs mx-auto">
          {preview.startsWith('data:image') ? (
            <img src={preview} alt="معاينة" className="max-h-40 rounded shadow" />
          ) : (
            <video src={preview} controls className="max-h-40 rounded shadow"></video>
          )}
          <button
            type="button"
            onClick={removePreview}
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
          >
            &times;
          </button>
        </div>
      )}
    </form>
  );
}