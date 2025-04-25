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
    label: "Review",
    key: "userProfile",
    imageWithKey: "userName",
  },
  { key: "agentName", label: "Agent Name", sortable: true },
  { key: "rating", label: "Rating", sortable: true },
  { key: "review", label: "Review", sortable: true },
  {
    key: "active",
    sortable: true,
    label: "Status",
    isMultiPurpose: true,
    multiPurposeProps: { type: "label" },
  },
  { key: "createdAt", label: "Created At", sortable: true, isDate: true },
];

const filterOptions = [
  { label: "Rating", value: "rating" },
  { label: "Review", value: "review" },
];

const Contacts: React.FC = () => {
  const formType = "Testimonial";
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
