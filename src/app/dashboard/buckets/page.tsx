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
    key: "coverImage",
    imageWithKey: "name",
    label: "Product Name",
  },
  { key: "mrp", label: "MRP", sortable: true, isCurrency: "₹" },
  { key: "ourPrice", label: "Our Price", sortable: true, isCurrency: "₹" },
  { key: "createdAt", label: "Creation Date", sortable: true, isDate: true },
];

const filterOptions = [{ label: "Name", value: "name" }];

const Contacts: React.FC = () => {
  const formType = "Bucket";
  const { data, loading, error } = useFetch(endpoints[formType].url);
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
