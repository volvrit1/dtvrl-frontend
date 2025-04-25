"use client";

import Image from "next/image";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { endpoints } from "@/data/endpoints";
import { Fetch, Put } from "@/hooks/apiUtils";
import { HiOutlineUserAdd } from "react-icons/hi";
import { getSelectFormattedData } from "@/hooks/general";
import DynamicForm from "@/components/common/DynamicForm";

interface BookingDetailsProps {
  data?: any;
  formType: string;
  setPaginate?: any;
  onClose?: () => void;
  setFilteredData?: any;
}

const InfoRow = ({ label, value }: { label: string; value?: any }) => (
  <div className="flex gap-2 text-sm text-gray-700">
    <span className="font-semibold text-gray-900 w-40">{label}:</span>
    <span className="text-gray-600">{value ?? "-"}</span>
  </div>
);

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-4 bg-cyan-100 rounded-2xl p-4">
    <h3 className="font-extrabold uppercase mb-4">{title}</h3>
    <div className="grid sm:grid-cols-3 gap-3">{children}</div>
  </div>
);

const BookingDetailsForm: React.FC<BookingDetailsProps> = ({
  data,
  onClose,
  formType,
  setPaginate,
  setFilteredData,
}) => {
  const [formfield, setFormField] = useState<any>([]);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(data?.agentId ? false : true);
  const [formData, setFormData] = useState<any>({
    agentId: data?.agentId?._id,
  });

  const {
    slot,
    cost,
    cropId,
    userId,
    landId,
    agentId,
    bookingDate,
    equipmentId,
    bookingStatus,
    paymentStatus,
  } = data || {};

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const params = { limit: 100, page: 1 };
        const response: any = await Fetch(
          "api/agent",
          params,
          5000,
          true,
          false
        );
        if (response?.success) {
          setFormField([
            {
              type: "select",
              required: true,
              name: "agentId",
              widthFull: true,
              label: "Select Agent",
              value: data?.agentId?._id,
              placeholder: "Select agent",
              options: getSelectFormattedData(response?.data?.result),
            },
          ]);
        }
      } catch (error) {
        console.log("Fetch Error: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAgents();
  }, [data?.agentId?._id]);

  const makeApiCall = async (updatedData: any) => {
    try {
      let url = endpoints[formType]?.url;
      if (data?._id) url = `${url}/${data?._id}`;

      setSubmitting(true);

      const response: any = await Put(url, updatedData);

      if (response.success) {
        const url = endpoints[formType]?.url;
        const resp: any = await Fetch(url, {}, 5000, true, false);
        if (resp?.success) setFilteredData(resp?.data?.result);
        if (resp?.success && resp?.data?.pagination)
          setPaginate(resp?.data?.pagination);
        onClose?.();
      } else return toast.error("Something went wrong!");
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="">
      <h2 className="text-2xl pb-4 font-bold text-gray-800">Booking Details</h2>

      <Section title="User Info">
        <div className="col-span-1">
          {userId.profile && (
            <Image
              src={
                userId.profile &&
                userId.profile.includes("/upload") &&
                `/api/image?url=${userId.profile}`
              }
              alt="Equipment Image"
              width={300}
              height={180}
              className="w-40 rounded-full"
            />
          )}
        </div>
        <div className="col-span-1 space-y-2">
          <InfoRow label="Name" value={userId?.name} />
          <InfoRow label="Phone" value={userId?.phone} />
          <InfoRow label="Email" value={userId?.email} />
          <InfoRow label="Gender" value={userId?.gender} />
          <InfoRow label="Age" value={userId?.age} />
          <InfoRow label="District" value={userId?.district} />
        </div>
        <div className="col-span-1 space-y-2">
          <InfoRow label="State" value={userId?.state} />
          <InfoRow label="Country" value={userId?.country} />
          <InfoRow label="PAN Number" value={userId?.panNumber} />
          <InfoRow label="Aadhaar" value={userId?.aadhaar} />
          <InfoRow label="Kisan ID" value={userId?.kisanId} />
          <InfoRow label="Eganna ID" value={userId?.egannaId} />
        </div>
      </Section>

      <Section title="Land Info">
        <InfoRow label="Name" value={landId?.name} />
        <InfoRow
          label="Area"
          value={`${landId?.area} ${landId?.measuringUnit}`}
        />
        <InfoRow label="Pin Code" value={landId?.pinCode} />
        <InfoRow label="Khasra Number" value={landId?.khasraNumber} />
        <InfoRow label="X Left" value={landId?.xLeftCoOrdinate} />
        <InfoRow label="X Right" value={landId?.xRightCoOrdinate} />
        <InfoRow label="Y Top" value={landId?.yTopCoOrdinate} />
        <InfoRow label="Y Bottom" value={landId?.yBottomCoOrdinate} />
      </Section>

      <Section title="Equipment Info">
        <InfoRow label="Name" value={equipmentId?.name} />
        <InfoRow label="Cost" value={`₹${equipmentId?.cost}`} />
        {/* <div className="col-span-1">
          {equipmentId?.image && (
            <Image
              src={
                equipmentId.image &&
                equipmentId.image.includes("/upload") &&
                `/api/image?url=${equipmentId.image}`
              }
              alt="Equipment Image"
              width={200}
              height={100}
              className="rounded-lg shadow border"
            />
          )}
        </div> */}
      </Section>

      {cropId && (
        <Section title="Crop Info">
          <InfoRow label="Name" value={cropId?.name} />
          {/* <div className="col-span-1"></div>
          <div className="col-span-1">
            {cropId?.image && (
              <Image
                src={
                  cropId.image &&
                  cropId.image.includes("/upload") &&
                  `/api/image?url=${cropId.image}`
                }
                alt="Equipment Image"
                width={100}
                height={100}
                className="w-fit rounded-lg shadow border"
              />
            )}
          </div> */}
        </Section>
      )}

      {agentId && (
        <Section title="Agent Info">
          <div className="col-span-1">
            {agentId?.photo && (
              <Image
                src={
                  agentId.photo &&
                  agentId.photo.includes("/upload") &&
                  `/api/image?url=${agentId.photo}`
                }
                alt="Equipment Image"
                width={300}
                height={180}
                className="w-32 rounded-full"
              />
            )}
          </div>
          <div className="col-span-1 space-y-2">
            <InfoRow label="Name" value={agentId?.name} />
            <InfoRow label="Phone" value={agentId?.phone} />
            <InfoRow label="Email" value={agentId?.email} />
            <InfoRow label="Aadhaar" value={agentId?.aadhaarNumber} />
            <InfoRow label="PAN" value={agentId?.panNumber} />
          </div>
          <div className="col-span-1 space-y-2">
            <InfoRow label="Account No." value={agentId?.accountNumber} />
            <InfoRow label="IFSC Code" value={agentId?.ifscCode} />
          </div>
        </Section>
      )}

      <Section title="Booking Info">
        <InfoRow
          label="Date"
          value={new Date(bookingDate).toLocaleDateString()}
        />
        <InfoRow label="Slot" value={slot} />
        <InfoRow label="Total Cost" value={`₹${cost}`} />
        <InfoRow label="Booking Status" value={bookingStatus} />
        <InfoRow
          label="Payment Status"
          value={paymentStatus ? "Paid" : "Pending"}
        />
      </Section>
      {!loading && (
        <div className="bg-cyan-100 p-5 rounded-xl">
          <div className="flex items-center pb-5 gap-2 text-gray-700 text-base font-medium">
            <HiOutlineUserAdd className="text-2xl text-primary" />
            <span className="text-xl font-semibold">
              Assign Agent to this Booking
            </span>
          </div>
          <DynamicForm
            onClose={onClose}
            fields={formfield}
            formData={formData}
            returnAs="formData"
            submitting={submitting}
            setFormData={setFormData}
            makeApiCall={makeApiCall}
          />
        </div>
      )}
    </div>
  );
};

export default BookingDetailsForm;
