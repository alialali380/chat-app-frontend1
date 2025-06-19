// UserList.tsx أو UserList.jsx
import React from "react";

interface User {
  username: string;
  connected?: boolean; // حالة الاتصال
}

interface Props {
  users: User[];
}

export default function UserList({ users }: Props) {
  // إزالة التكرار حسب اسم المستخدم باستخدام Map
  const uniqueUsers = Array.from(
    new Map(users.map((user) => [user.username, user])).values()
  );

  return (
    <div className="bg-white rounded-xl shadow-md p-4 border border-green-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
        👥 المستخدمون المتصلون
      </h3>
      <ul className="space-y-2 max-h-64 overflow-y-auto pr-2">
        {uniqueUsers.length === 0 ? (
          <li className="text-sm text-gray-500 italic">لا يوجد مستخدمين متصلين</li>
        ) : (
          uniqueUsers.map((user, index) => (
            <li
              key={index}
              className="flex items-center p-2 rounded-lg hover:bg-green-50 transition-all duration-200 transform hover:translate-x-1"
            >
              <span
                className={`inline-block w-3 h-3 rounded-full mr-3 transition-transform duration-300 ${
                  user.connected ? "bg-green-500 animate-pulse" : "bg-red-500"
                }`}
              ></span>
              <span
                className={`${
                  user.connected ? "font-medium text-gray-800" : "text-gray-500"
                }`}
              >
                {user.username}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}