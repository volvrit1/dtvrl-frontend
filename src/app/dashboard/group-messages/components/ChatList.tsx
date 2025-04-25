"use client";

import Image from "next/image";
import { FaEnvelope, FaClock, FaChevronRight } from "react-icons/fa";

interface ChatUser {
  id: string;
  name: string;
  email: string;
  message: string;
  avatar: string;
  time: string;
}

const users: ChatUser[] = [
  {
    id: "1",
    name: "Aarav Mehta",
    email: "aarav.mehta@gmail.com",
    message: "Hi, I wanted to confirm my therapy session for tomorrow.",
    avatar: "/assets/login/profile.png",
    time: "Just now",
  },
  {
    id: "2",
    name: "Priya Sharma",
    email: "priya.sharma92@gmail.com",
    message: "Could you please share the Zoom link?",
    avatar: "/assets/login/profile.png",
    time: "5 minutes ago",
  },
  {
    id: "3",
    name: "Rohan Kapoor",
    email: "rohan.kapoor88@gmail.com",
    message: "Thanks for today's session, it was really helpful.",
    avatar: "/assets/login/profile.png",
    time: "1 hour ago",
  },
];

interface ChatListProps {
  onSelect: (user: ChatUser | null) => void;
  selectedUserId: string | null;
}

export default function ChatList({ onSelect, selectedUserId }: ChatListProps) {
  return (
    <div className="w-full sm:w-1/3 h-screen bg-white overflow-hidden">
      <div className="flex items-center justify-between px-4 py-4 bg-primary">
        <span className="bg-white text-cyan-600 px-4 py-1 rounded-full text-sm font-semibold tracking-wide">
          Open Chats • {users.length}
        </span>
      </div>

      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="w-full pl-10 pr-4 py-3 text-sm bg-white placeholder-gray-400 text-gray-800 focus:outline-none"
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.15z"
          />
        </svg>
      </div>

      <div className="overflow-y-auto h-[calc(100vh-64px)]">
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => onSelect(user)}
            className={`flex gap-3 items-start px-2 py-4 cursor-pointer transition-all duration-200 ${
              selectedUserId === user.id
                ? "bg-cyan-100 border-r-[3px] border-primary"
                : "hover:bg-cyan-100/80 border-r-[3px] border-white"
            }`}
          >
            <Image
              width={100}
              height={100}
              unoptimized
              alt="avatar"
              src={user.avatar}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-cyan-400"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <p className="text-sm font-semibold text-cyan-800 flex items-center gap-2">
                  {user.name}
                </p>
                <span className="text-xs text-cyan-600 flex items-center gap-1">
                  <FaClock className="text-primary" />
                  {user.time}
                </span>
              </div>

              <div className="flex items-center gap-2 text-cyan-700 text-xs">
                <FaEnvelope className="text-primary" />
                <span className="truncate max-w-[180px]">{user.email}</span>
              </div>

              <p className="mt-1.5 text-sm text-cyan-900 line-clamp-1">
                {user.message}
              </p>
            </div>

            <FaChevronRight className="text-cyan-400 mt-1" />
          </div>
        ))}
      </div>
    </div>
  );
}
