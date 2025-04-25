"use client";

import Image from "next/image";
import { useState } from "react";
import AuthGuard from "@/components/AuthGuard";
import Wrapper from "@/components/common/Wrapper";

const notifications = {
  today: [
    {
      id: 1,
      name: "Gaurav",
      message: "Hi, I have an appointment scheduled for tomorrow.",
      time: "2 hr ago",
      avatar: "/assets/bg/placeholder.avif",
      unread: true,
    },
    {
      id: 2,
      name: "Anil",
      message: "Please, prescribe me medicine for my allergy.",
      time: "4 hr ago",
      avatar: "/assets/bg/placeholder.avif",
      unread: false,
    },
    {
      id: 3,
      name: "Meera",
      message: "Can we reschedule our session to Friday?",
      time: "1 hr ago",
      avatar: "/assets/bg/placeholder.avif",
      unread: true,
    },
    {
      id: 4,
      name: "Dr. Sharma",
      message: "Your report is ready for download.",
      time: "5 min ago",
      avatar: "/assets/bg/placeholder.avif",
      unread: true,
    },
  ],
  previous: [
    {
      id: 5,
      name: "Ravi",
      message: "Thanks for the consultation yesterday.",
      time: "1 day ago",
      avatar: "/assets/bg/placeholder.avif",
      unread: false,
    },
    {
      id: 6,
      name: "Neha",
      message: "Please check the blood test report I uploaded.",
      time: "2 days ago",
      avatar: "/assets/bg/placeholder.avif",
      unread: false,
    },
    {
      id: 7,
      name: "Admin",
      message: "System maintenance is scheduled for this weekend.",
      time: "3 days ago",
      avatar: "/assets/bg/placeholder.avif",
      unread: false,
    },
  ],
};

export default function NotificationPanel() {
  const [activeTab, setActiveTab] = useState<"today" | "previous">("today");

  return (
    <AuthGuard>
      <Wrapper>
        <div className="w-full bg-white p-5 rounded-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Notifications</h2>
            <div className="flex gap-4 text-sm">
              <button className="text-cyan-600 hover:underline">
                Mark as read
              </button>
              <button className="text-red-500 hover:underline">
                Clear All
              </button>
            </div>
          </div>

          <div className="flex mt-4 border-b text-sm">
            <button
              className={`mr-4 pb-2 border-b-2 ${
                activeTab === "today"
                  ? "border-cyan-500 text-cyan-600"
                  : "border-transparent text-gray-500"
              }`}
              onClick={() => setActiveTab("today")}
            >
              Today{" "}
              <span className="ml-1 bg-cyan-100 text-cyan-600 text-xs px-2 py-0.5 rounded-full">
                {notifications?.today?.length}
              </span>
            </button>
            <button
              className={`pb-2 border-b-2 ${
                activeTab === "previous"
                  ? "border-cyan-500 text-cyan-600"
                  : "border-transparent text-gray-500"
              }`}
              onClick={() => setActiveTab("previous")}
            >
              Previous
              <span className="ml-1 bg-cyan-100 text-cyan-600 text-xs px-2 py-0.5 rounded-full">
                {notifications?.previous?.length}
              </span>
            </button>
          </div>

          <div className="mt-4 space-y-4">
            {notifications[activeTab].length === 0 ? (
              <p className="text-gray-400 text-sm">
                No {activeTab} notifications.
              </p>
            ) : (
              notifications[activeTab].map((noti) => (
                <div key={noti.id} className="flex border-b items-start gap-4">
                  <div className="relative">
                    <Image
                      src={noti.avatar}
                      alt={noti.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover w-10 h-10"
                    />
                    {noti.unread && (
                      <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-cyan-500 ring-2 ring-white"></span>
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="font-semibold text-sm">{noti.name}</p>
                    <p className="text-gray-600 text-sm">{noti.message}</p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap pt-1">
                    {noti.time}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </Wrapper>
    </AuthGuard>
  );
}
