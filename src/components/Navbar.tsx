"use client";

import Profile from "./Profile";
// import Notification from "./Notification";
import { useEffect, useState } from "react";
import { includes } from "@/hooks/polyfills";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
// import SocketListener from "@/context/SocketListener";

const Navbar: React.FC = () => {
  const { token } = useAuth();
  const pathname = usePathname();
  const [stateReady, setStateReady] = useState(false);

  useEffect(() => {
    const list = ["/auth/login", "/login", "/auth"];
    if (!includes(list, pathname)) localStorage.setItem("pathname", pathname);
    else localStorage.removeItem("pathname");
  }, [pathname]);

  useEffect(() => {
    setStateReady(true);
  }, []);

  return (
    <>
      {stateReady && token && (
        <nav
          className={`sticky top-0 bg-primary w-[83%] ml-[17%] z-50 p-2 text-black`}
        >
          <div className="flex justify-between items-center">
            {/* ✅ Search Box */}
            <div className="w-1/2">
              <input
                type="text"
                placeholder="Search for anything..."
                className="w-full px-4 py-2.5 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Existing Right Side */}
            <div className="flex w-1/2 text-iconBlack justify-end items-center">
              <Profile />
              {/* <Notification />
              <SocketListener /> */}
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
