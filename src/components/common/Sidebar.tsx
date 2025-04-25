"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { tabs } from "@/data/tabs";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const Sidebar: React.FC = () => {
  const { token } = useAuth();
  const pathname = usePathname();

  if (!token) return null;

  return (
    <div
      className={`fixed w-[17%] h-full overflow-y-scroll no-scrollbar bg-primary`}
    >
      <div className="flex justify-center bg-primary w-full items-center sticky top-0">
        <Image
          priority
          alt="Icon"
          width={200}
          unoptimized
          height={100}
          src="/assets/logo/logo.png"
          className="w-20 pb-2 mx-auto object-contain"
        />
      </div>
      <nav className="flex flex-col justify-center items-center mb-40">
        {tabs.map((tab: any) => {
          const Icon = tab.icon;
          return (
            <React.Fragment key={tab?.id}>
              <Link
                href={tab?.href}
                className={`py-2.5 pl-6 mr-auto w-full text-sm pr-2 cursor-pointer transition flex justify-between gap-2 items-center border-primary hover:bg-white hover:text-primary ${
                  pathname === tab?.href
                    ? "bg-white text-primary font-semibold"
                    : "text-white"
                }`}
              >
                <span className="flex gap-3 items-center">
                  <Icon size={18} /> {tab?.label}
                </span>
              </Link>
            </React.Fragment>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
