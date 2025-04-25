"use client";

import useFetch from "@/hooks/useFetch";
import { endpoints } from "@/data/endpoints";
import AuthGuard from "@/components/AuthGuard";
import Loader from "@/components/common/Loader";
import Wrapper from "@/components/common/Wrapper";
import TableComponent from "@/components/common/Table";

const columns = [
  {
    image: true,
    label: "User",
    key: "profile",
    imageWithKey: "name",
  },
  { key: "phone", label: "Phone", sortable: true },
  { key: "gender", label: "Gender", sortable: true },
  { key: "state", label: "State", sortable: true },
  { key: "district", label: "District", sortable: true },
  { key: "createdAt", label: "Registered At", sortable: true, isDate: true },
];

const filterOptions = [
  { label: "Name", value: "name" },
  { label: "Phone", value: "phone" },
  { label: "State", value: "state" },
  { label: "District", value: "district" },
];

const Contacts: React.FC = () => {
  const formType = "User";
  const { data, loading, error } = useFetch(endpoints[formType]?.url);
  const updatedData = data?.data?.result;
  const paginationData = data?.data?.pagination;
  const operationsAllowed = endpoints[formType]?.operations;

  if (loading && !updatedData && !error) return <Loader />;

  return (
    <AuthGuard>
      <Wrapper>
        <TableComponent
          type={formType}
          columns={columns}
          data={updatedData}
          filterOptions={filterOptions}
          pagination_data={paginationData}
          operationsAllowed={operationsAllowed}
        />
      </Wrapper>
    </AuthGuard>
  );
};

export default Contacts;
