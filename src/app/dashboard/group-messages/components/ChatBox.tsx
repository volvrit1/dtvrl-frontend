"use client";

import Image from "next/image";
import { useState } from "react";
import { FaPaperPlane, FaImage, FaSmile } from "react-icons/fa";
import { FaComments, FaInbox, FaInfoCircle } from "react-icons/fa";

interface ChatUser {
  id: string;
  name: string;
  email: string;
  message: string;
  avatar: string;
  time: string;
}

interface ChatBoxProps {
  user: ChatUser | null;
}

interface Message {
  fromSelf: boolean;
  text: string;
  image?: string;
}

// interface ChatWindowProps {
//   user: {
//     name: string;
//     email: string;
//     avatar: string;
//   };
// }

const NoConversation = () => {
  return (
    <div className="w-2/3 flex flex-col bg-white border-l border-cyan-200 items-center justify-center text-gray-500 px-6 py-10 text-center">
      <FaComments className="text-cyan-400 text-6xl mb-6 animate-pulse" />
      <h2 className="text-2xl font-semibold mb-2">No Conversation Selected</h2>
      <p className="text-sm text-gray-500 mb-4 max-w-md">
        You haven&apos;t selected any chat yet. Choose a conversation from the
        list on the left to view messages and continue where you left off.
      </p>

      <div className="flex gap-4 text-sm text-gray-400 items-center justify-center mt-4">
        <div className="flex items-center gap-2">
          <FaInbox className="text-cyan-400 text-2xl" />
          <span className="text-lg">Inbox</span>
        </div>
        <div className="flex items-center gap-2">
          <FaInfoCircle className="text-cyan-400 text-2xl" />
          <span className="text-lg">Details</span>
        </div>
      </div>
    </div>
  );
};

const NoMessages = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-500 px-6 text-center animate-fade-in">
      <div className="bg-cyan-100 p-6 rounded-full shadow-md mb-4">
        <FaComments className="text-cyan-600 text-5xl" />
      </div>

      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        No Conversations Yet
      </h2>
      <p className="text-sm text-gray-500 max-w-md mb-4">
        Looks like you haven&apos;t started a chat. Select a contact from the
        list or start a new conversation to begin messaging.
      </p>

      <div className="flex items-center gap-3 text-cyan-600">
        <div className="flex items-center gap-2">
          <FaPaperPlane className="text-base" />
          <span className="text-sm">Start a chat</span>
        </div>
        <div className="flex items-center gap-2">
          <FaSmile className="text-base" />
          <span className="text-sm">Make it friendly</span>
        </div>
      </div>
    </div>
  );
};

export default function ChatBox({ user }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      fromSelf: false,
      text: "Hi there! How can I help you today?",
    },
    {
      fromSelf: true,
      text: "I wanted to ask about my appointment.",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSend = () => {
    if (newMessage.trim() === "" && !image) return;

    setMessages((prev) => [
      ...prev,
      {
        fromSelf: true,
        text: newMessage,
        image: image ? URL.createObjectURL(image) : undefined,
      },
    ]);
    setNewMessage("");
    setImage(null);
  };

  if (!user) return <NoConversation />;

  return (
    <div className="w-2/3 h-screen flex flex-col border-l border-cyan-300 bg-white relative">
      {/* Header */}
      <div className="bg-cyan-600 px-4 py-1.5 text-white">
        <h2 className="text-lg font-semibold">{user.name}</h2>
        <p className="text-sm text-white/80">{user.email}</p>
      </div>

      {/* Messages / Empty State */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4 relative"
        style={{
          backgroundImage: "url('/assets/bg/bg2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm z-0" />
        <div className="relative z-10 space-y-4">
          {messages.length === 0 ? (
            <NoMessages />
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2 ${msg.fromSelf ? "justify-end" : ""}`}
              >
                {!msg.fromSelf && (
                  <Image
                    width={100}
                    height={100}
                    unoptimized
                    alt="avatar"
                    src={user.avatar}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-cyan-400"
                  />
                )}
                <div
                  className={`rounded-md px-4 py-2 max-w-xs text-sm ${
                    msg.fromSelf
                      ? "bg-primary text-white font-bold"
                      : "bg-white/80 text-gray-800"
                  }`}
                >
                  {msg.text}
                  {msg.image && (
                    <Image
                      width={100}
                      height={100}
                      unoptimized
                      alt="chat image"
                      src={msg.image}
                      className="mt-2 rounded-lg w-32 h-32 object-cover"
                    />
                  )}
                </div>
                {msg.fromSelf && (
                  <Image
                    width={100}
                    height={100}
                    unoptimized
                    alt="avatar"
                    src={user.avatar}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-cyan-400"
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Input Section */}
      <div className="p-2 sticky bottom-0 bg-cyan-600 flex items-center gap-3">
        <label
          htmlFor="imageUpload"
          className="cursor-pointer text-white transition"
        >
          <FaImage className="text-3xl" />
        </label>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) =>
            e.target.files && setImage(e.target.files[0] || null)
          }
        />
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          className="bg-white hover:bg-cyan-600 text-primary p-2 rounded-full transition-all"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}
