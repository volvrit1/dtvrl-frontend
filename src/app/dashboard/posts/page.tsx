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
    sortable: true,
    key: "image",
    imageWithKey: "name",
    label: "Equipment",
  },
  { key: "cost", label: "Price", sortable: true, isCurrency: "₹" },
  { key: "description", label: "Description", sortable: true },
  { key: "createdAt", label: "Created At", sortable: true, isDate: true },
];

const filterOptions = [
  { label: "Name", value: "name" },
  { label: "Desc.", value: "description" },
];

const Contacts: React.FC = () => {
  const formType = "Post";
  const { data, loading, error } = useFetch(endpoints[formType].url);
  const updatedData = data?.data?.result;
  const paginationData = data?.data?.pagination;
  const operationsAllowed = endpoints[formType].operations;

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
