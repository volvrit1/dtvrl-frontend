"use client";

import { useState } from "react";
import ChatBox from "./components/ChatBox";
import ChatList from "./components/ChatList";
import AuthGuard from "@/components/AuthGuard";
import Wrapper from "@/components/common/Wrapper";

const Dashboard: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null);

  return (
    <AuthGuard>
      <Wrapper>
        <div className="flex">
          <ChatList
            onSelect={setSelectedUser}
            selectedUserId={selectedUser?.id || null}
          />
          <ChatBox user={selectedUser} />
        </div>
      </Wrapper>
    </AuthGuard>
  );
};

export default Dashboard;
