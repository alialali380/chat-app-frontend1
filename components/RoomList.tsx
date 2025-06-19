import React from 'react';

interface Props {
  currentRoom: string;
  onJoin: (room: string) => void;
}

const predefinedRooms = ['عام', 'مطورون', 'تصميم', 'إدارة', 'مشاريع'];

export default function RoomList({ currentRoom, onJoin }: Props) {
  return (
    <ul className="space-y-2">
      {predefinedRooms.map((room) => (
        <li key={room}>
          <button
            onClick={() => onJoin(room)}
            className={`w-full text-left px-3 py-2 rounded ${
              currentRoom === room ? 'bg-blue-600' : 'hover:bg-gray-700'
            }`}
          >
            #{room}
          </button>
        </li>
      ))}
    </ul>
  );
}