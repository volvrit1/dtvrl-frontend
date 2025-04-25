"use client";

import { useEffect } from "react";
import { io } from "socket.io-client";
import {
  askNotificationPermission,
  showBrowserNotification,
} from "@/utils/notifications";

const socket = io(process.env.NEXT_PUBLIC_BASE_URL, {
  transports: ["websocket"],
  withCredentials: true,
});

const SocketListener = () => {
  useEffect(() => {
    const setup = async () => {
      const granted = await askNotificationPermission();
      if (granted) {
        socket.on(
          "new-notification",
          (data: { title: string; body: string }) => {
            showBrowserNotification(data.title, data.body, {
              onClick: () => window.focus(),
            });
          }
        );
      }
    };
    setup();
    return () => {
      socket.off("new-notification");
    };
  }, []);
  return null;
};

export default SocketListener;
