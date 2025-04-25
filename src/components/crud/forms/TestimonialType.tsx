"use client";

import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { endpoints } from "@/data/endpoints";
import { Fetch, Post, Put } from "@/hooks/apiUtils";
import DynamicForm from "@/components/common/DynamicForm";
import { TestimonialType } from "../formtype/EquipmentType";
import {
  getSelectFormattedData,
  populateFormData,
  populateFormFields,
} from "@/hooks/general";

interface TestimonialTypeProps {
  data?: any;
  onClose?: any;
  formType: any;
  setPaginate?: any;
  setFilteredData?: any;
}

const TestimonialTypeForm: React.FC<TestimonialTypeProps> = (props: any) => {
  const data = props.data;
  const formType = props.formType;
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formField, setFormField] = useState<any>(
    data?._id ? populateFormFields(TestimonialType, data) : TestimonialType
  );

  const [formData, setFormData] = useState<any>(
    data?._id ? populateFormData(TestimonialType, data) : {}
  );

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const url = "/api/review/base-fields";
        const response: any = await Fetch(url, {}, 5000, true, false);
        if (response.success) {
          const userData = getSelectFormattedData(response?.data?.userData);
          const agentData = getSelectFormattedData(response?.data?.agentData);
          const updatedFormField = formField.map((obj: any) => {
            if (obj.name === "userId") return { ...obj, options: userData };
            if (obj.name === "agentId") return { ...obj, options: agentData };
            return obj;
          });
          setFormField(updatedFormField);
        }
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();
    // eslint-disable-next-line
  }, []);

  const makeApiCall = async (updatedData: any) => {
    try {
      let url = endpoints[formType]?.url;
      if (data?._id) url = `${url}/${data?._id}`;

      setSubmitting(true);

      const response: any = data?._id
        ? await Put(url, updatedData)
        : await Post(url, updatedData);

      if (response.success) {
        const url = endpoints[formType]?.url;
        const resp: any = await Fetch(url, {}, 5000, true, false);
        if (resp?.success) props?.setFilteredData(resp?.data?.result);
        if (resp?.success && resp?.data?.pagination)
          props?.setPaginate(resp?.data?.pagination);
        props.onClose?.();
      } else return toast.error("Something went wrong!");
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {!loading && (
        <>
          <h2 className="text-2xl pb-4 font-semibold text-gray-800">
            {data?._id ? "Edit Testimonial Details" : "Add New Testimonial"}
          </h2>
          <DynamicForm
            fields={formField}
            formData={formData}
            returnAs="formData"
            submitting={submitting}
            onClose={props?.onClose}
            setFormData={setFormData}
            makeApiCall={makeApiCall}
          />
        </>
      )}
    </div>
  );
};

export default TestimonialTypeForm;
