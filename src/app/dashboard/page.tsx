"use client";

import AuthGuard from "@/components/AuthGuard";
import Wrapper from "@/components/common/Wrapper";
// import SessionsTasks from "../../components/common/SessionsTasks";
import DashboardOverview from "../../components/common/DashboardOverview";

const Dashboard: React.FC = () => {
  return (
    <AuthGuard>
      <Wrapper>
        <div>
          <DashboardOverview />
          {/* <SessionsTasks /> */}
        </div>
      </Wrapper>
    </AuthGuard>
  );
};

export default Dashboard;
