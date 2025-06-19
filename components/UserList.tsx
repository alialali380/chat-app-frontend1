import React from "react";

interface User {
  username: string;
  connected?: boolean; // ✅ حالة الاتصال
}

interface Props {
  users: User[];
}

export default function UserList({ users }: Props) {
  // ✅ تحويل إلى Set لحذف التكرار بناءً على الاسم
  const uniqueUsers = Array.from(
    new Map(users.map((user) => [user.username, user])).values()
  );

  return (
    <ul className="space-y-2 p-2 bg-gray-200 rounded">
      {uniqueUsers.map((user, index) => (
        <li key={index} className="text-sm flex items-center">
          <span
            className={`inline-block w-2 h-2 rounded-full mr-2 ${
              user.connected ? "bg-green-500" : "bg-red-500"
            }`}
          ></span>
          {user.username}
        </li>
      ))}
    </ul>
  );
}