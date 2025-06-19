import React, { useState, useRef } from 'react';
import { FaPaperPlane, FaImage, FaRegTimesCircle } from 'react-icons/fa';

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
    <form onSubmit={handleSubmit} className="p-4 border-t bg-white shadow-md transition-all duration-300">
      {/* حقل النص والملف */}
      <div className="flex items-center gap-2 mb-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="اكتب رسالتك..."
          aria-label="اكتب رسالتك هنا"
          className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
        />
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*,video/*"
          className="hidden"
          id="file-upload"
          onChange={handleFileChange}
        />
        <label htmlFor="file-upload" className="bg-green-100 text-green-600 p-3 rounded-full cursor-pointer hover:bg-green-200 transition duration-200" aria-label="اختر ملف">
          <span className="sr-only">اختر صورة أو فيديو</span>
          <FaImage size={20} />
        </label>
        <button
          type="submit"
          disabled={!text.trim() && !preview}
          aria-label="إرسال الرسالة"
          className={`${
            text.trim() || preview ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300 cursor-not-allowed'
          } text-white p-3 rounded-full flex items-center justify-center transition duration-200`}
        >
          <FaPaperPlane />
        </button>
      </div>

      {/* معاينة الصورة أو الفيديو */}
      {preview && (
        <div className="relative mt-3 max-w-xs mx-auto group">
          {preview.startsWith('data:image') ? (
            <img src={preview} alt="معاينة" className="w-full h-auto max-h-60 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105" />
          ) : (
            <video src={preview} controls className="w-full h-auto max-h-60 rounded-lg shadow-md"></video>
          )}
          <button
            type="button"
            onClick={removePreview}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity"
            aria-label="إزالة الملف"
          >
            <FaRegTimesCircle size={18} />
          </button>
        </div>
      )}
    </form>
  );
}