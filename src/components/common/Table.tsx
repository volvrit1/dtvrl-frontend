"use client";

import dayjs from "dayjs";
import Modal from "./Modal";
import Header from "./table/Header";
import Filters from "./table/Filters";
import { toast } from "react-toastify";
import FormRenderer from "./FormRender";
import { Fetch } from "@/hooks/apiUtils";
import Table from "./table/TableComponent";
import Pagination from "./table/Pagination";
import { endpoints } from "@/data/endpoints";
import { usePathname } from "next/navigation";
import ExpenseStats from "./table/ExpenseStats";
import React, { useState, useEffect, useCallback } from "react";

interface TableColumn {
  key: string;
  label: string;
  isDate?: boolean;
  sortable?: boolean;
  filterable?: boolean;
}

interface TableProps {
  data: any;
  id?: string;
  type?: any;
  suffix?: string;
  hideHeader?: any;
  filterOptions?: any;
  columns: TableColumn[];
  operationsAllowed: any;
  hideDateFilter?: boolean;
  hideEverything?: boolean;
  pagination_data?: Pagination;
}

interface Pagination {
  totalPages: number;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
}

const TableComponent = <T extends { [key: string]: any }>({
  data,
  type,
  suffix,
  id = "",
  columns,
  hideHeader,
  filterOptions,
  hideEverything,
  hideDateFilter,
  pagination_data,
  operationsAllowed,
}: TableProps) => {
  const pathname = usePathname();
  const [moreData, setMoreData] = useState<any>({});
  const [paginate, setPaginate] = useState<Pagination>({
    totalPages: pagination_data?.totalPages ?? 1,
    totalItems: pagination_data?.totalItems ?? 0,
    currentPage: pagination_data?.currentPage ?? 1,
    itemsPerPage: pagination_data?.itemsPerPage ?? 10,
  });
  const [activeStatus, setActiveStatus] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [sort, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc" | null;
  }>({
    key: "",
    direction: null,
  });
  const [formData, setData] = useState<any>({});
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [formConfig, setFormConfig] = useState<any>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<Array<T>>(data ?? []);

  const handleCloseModal = () => {
    setFormConfig("");
    setIsModalVisible(false);
  };

  const handleSearch = (searchTerm: string, selectedOption: string) => {
    if (searchTerm && searchTerm.length < 3)
      return toast.warn("Search term must be at least 3 characters");
    setSearchTerm(searchTerm);
    setSelectedField(selectedOption);
    fetchFilteredData({ search: searchTerm, selectedField: selectedOption });
  };

  const handleReset = async () => {
    setEndDate("");
    setStartDate("");
    setSearchTerm("");
    setSelectedField("");
    setActiveStatus("all");
    await fetchFilteredData({
      limit: 10,
      page: 1,
      end: "",
      start: "",
      sortkey: "",
      search: "",
      sortdir: "",
      status: "all",
    });
  };

  const fetchFilteredData = useCallback(async (filterParams: any = {}) => {
    // Build data object with fallback to existing state
    const data = {
      end: filterParams.end ?? endDate,
      sortkey: filterParams.key ?? sort.key,
      start: filterParams.start ?? startDate,
      search: filterParams.search ?? searchTerm,
      sortdir: filterParams.dir ?? sort.direction,
      status: filterParams.status ?? activeStatus,
      current: filterParams.page ?? paginate.currentPage,
      limit: filterParams.limit ?? paginate.itemsPerPage,
      searchkey: filterParams.selectedField ?? selectedField,
    };

    // Update pagination state
    setPaginate({
      ...paginate,
      currentPage: data.current,
      itemsPerPage: data.limit,
    });

    // Initialize query params
    const params: Record<string, any> = {
      page: data.current,
      limit: data.limit,
    };

    // Add status if applicable
    if (activeStatus !== "all" && data.status !== "all") {
      params.status = data.status;
    }

    // Add search if valid
    if (data.search?.length > 2 && data.searchkey) {
      params.search = data.search;
      params.searchKey = data.searchkey;
    }

    // Add start date if valid
    const start = data.start || startDate;
    if (start) {
      params.startDate = dayjs(start).format("YYYY-MM-DD");
    }

    // Add end date if valid
    const end = data.end || endDate;
    if (end) {
      params.endDate = dayjs(end).format("YYYY-MM-DD");
    }

    // Add sorting details if valid
    if (data.sortkey) {
      params.sortKey = data.sortkey;
      params.sortDir = data.sortdir;
    }

    // Fetch data from endpoint
    const fetchEndpoint = endpoints[type]?.url;
    if (fetchEndpoint) {
      try {
        const response: any = await Fetch(
          fetchEndpoint + id,
          params,
          5000,
          true,
          false
        );
        if (response?.success) {
          setMoreData(response.data);
          setFilteredData(response?.data?.result || []);
          setPaginate(response?.data?.pagination);
        }
      } catch (error) {
        console.log("Error fetching filtered data:", error);
      }
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (pathname) fetchFilteredData({});
  }, [pathname, fetchFilteredData]);

  useEffect(() => {
    if (isModalVisible) {
      document.body.style.overflow = "hidden"; // prevent overflow
    } else document.body.style.overflow = "scroll";
  }, [isModalVisible]);

  const handleAdd = () => {
    setData({ name });
    setIsModalVisible(true);
  };

  // if (filteredData.length === 0 && !isModalVisible)
  //   return (
  //     <NoDataFound
  //       type={type}
  //       handleAdd={handleAdd}
  //       handleReset={handleReset}
  //       operationsAllowed={operationsAllowed}
  //     />
  //   );

  return (
    <>
      {/* Modals */}
      <Modal
        width="w-4/5"
        isVisible={isModalVisible}
        onClose={handleCloseModal}
      >
        {type && formData && (
          <FormRenderer
            data={formData}
            setPaginate={setPaginate}
            onClose={handleCloseModal}
            setFilteredData={setFilteredData}
            formType={formConfig ? formConfig : type}
          />
        )}
      </Modal>

      {type === "Expense" && <ExpenseStats data={moreData} />}

      {/* Header */}
      {!hideHeader && (
        <Header
          type={type}
          suffix={suffix}
          handleAdd={handleAdd}
          handleReset={handleReset}
          filteredData={filteredData}
          operationsAllowed={operationsAllowed}
        />
      )}

      <div className="py-5">
        {/* Search and Filters */}
        {!hideEverything && (
          <Filters
            endDate={endDate}
            paginate={paginate}
            startDate={startDate}
            searchTerm={searchTerm}
            setEndDate={setEndDate}
            handleSearch={handleSearch}
            setStartDate={setStartDate}
            filterOptions={filterOptions}
            setSearchTerm={setSearchTerm}
            hideDateFilter={hideDateFilter}
            fetchFilteredData={fetchFilteredData}
          />
        )}

        {/* Table */}
        <Table
          sort={sort}
          type={type}
          columns={columns}
          setData={setData}
          setPaginate={setPaginate}
          filteredData={filteredData}
          setSortConfig={setSortConfig}
          setFilteredData={setFilteredData}
          setIsModalVisible={setIsModalVisible}
          operationsAllowed={operationsAllowed}
          fetchFilteredData={fetchFilteredData}
        />

        {/* Pagination */}
        {!hideEverything && (
          <Pagination
            paginate={paginate}
            fetchFilteredData={fetchFilteredData}
          />
        )}
      </div>
    </>
  );
};

export default TableComponent;
