import { FormField } from "@/hooks/types";

export const EquipmentType: FormField[] = [
  {
    name: "name",
    type: "text",
    required: true,
    widthFull: true,
    label: "Equipment Name",
    placeholder: "Enter Equipment Name",
  },
  {
    name: "image",
    label: "Equipment Image",
    type: "file",
    required: true,
  },
];

export const TestimonialType: FormField[] = [
  {
    type: "select",
    required: true,
    label: "User ID",
    name: "userId",
    placeholder: "Select user",
    options: [],
  },
  {
    type: "select",
    required: true,
    label: "Agent ID",
    name: "agentId",
    placeholder: "Select agent",
    options: [],
  },
  {
    type: "select",
    required: true,
    name: "rating",
    label: "Rating",
    placeholder: "Select rating",
    options: [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" },
      { label: "5", value: "5" },
    ],
  },
  {
    name: "active",
    label: "Do you want to activate this review?",
    type: "choose",
    required: true,
  },
  {
    name: "review",
    required: true,
    type: "textarea",
    label: "Write a Review",
    placeholder: "Enter review",
  },
];

export const cropType: FormField[] = [
  {
    name: "name",
    type: "text",
    required: true,
    widthFull: true,
    label: "Crop Name",
    placeholder: "Enter Crop Name",
  },
  {
    name: "active",
    label: "Do you want to activate this crop?",
    type: "choose",
    required: true,
  },
  {
    name: "image",
    label: "Crop Image",
    type: "file",
    required: true,
  },
];

export const ServiceType: FormField[] = [
  {
    name: "name",
    type: "text",
    required: true,
    widthFull: true,
    label: "Service Name",
    placeholder: "Enter Service Name",
  },
  {
    name: "image",
    label: "Service Image",
    type: "file",
    required: true,
  },
];

export const BannerType: FormField[] = [
  {
    name: "name",
    type: "text",
    label: "Banner Title",
    placeholder: "Enter banner title",
  },
  {
    rows: 1,
    type: "textarea",
    name: "description",
    label: "Banner Description",
    placeholder: "Enter banner description",
  },
  {
    name: "order",
    maxLength: 2,
    required: true,
    label: "Banner Order",
    type: "stringNumeric",
    placeholder: "Enter order",
  },
  {
    name: "image",
    type: "file",
    required: true,
    label: "Banner Image",
  },
];

export const AgentType: FormField[] = [
  {
    name: "name",
    type: "text",
    required: true,
    label: "Agent Name",
    placeholder: "Enter agent Name",
  },
  {
    name: "phone",
    maxLength: 15,
    required: true,
    label: "Phone Number",
    type: "stringNumeric",
    placeholder: "Enter phone number",
  },
  {
    name: "email",
    type: "email",
    required: true,
    label: "Agent Email",
    placeholder: "Enter agent Email",
  },
  {
    type: "text",
    name: "aadhaarNumber",
    label: "Aadhar Number",
    placeholder: "Enter agent Aadhar Number",
  },
  {
    type: "text",
    name: "panNumber",
    label: "PAN Number",
    placeholder: "Enter agent PAN Number",
  },
  {
    type: "text",
    name: "accountNumber",
    label: "Account Number",
    placeholder: "Enter agent Account Number",
  },
  {
    type: "text",
    name: "ifscCode",
    label: "Agent IFSC Code",
    placeholder: "Enter agent IFSC Code",
  },
  {
    name: "photo",
    label: "Agent Profile Pic",
    type: "file",
    required: true,
  },
];
