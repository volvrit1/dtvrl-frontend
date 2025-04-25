import { getSelectFormattedData } from "./../../../hooks/general";
import { states } from "@/data/data";
import { FormField } from "@/hooks/types";

export const UserType: FormField[] = [
  {
    name: "name",
    type: "text",
    required: true,
    label: "Name",
    placeholder: "Enter Name",
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
    label: "Email",
    placeholder: "Enter Email",
  },
  {
    name: "gender",
    type: "select",
    label: "Gender",
    required: true,
    placeholder: "Select Gender",
    options: [
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" },
      { label: "Other", value: "Other" },
    ],
  },
  {
    name: "age",
    maxLength: 3,
    required: true,
    type: "stringNumeric",
    label: "User Age (In Years)",
    placeholder: "Enter User Age",
  },
  {
    type: "br",
    name: "address",
    label: "Address Details",
    widthFull: true,
  },
  {
    type: "select",
    value: "India",
    name: "country",
    required: true,
    label: "Country",
    placeholder: "Select Country",
    options: [{ label: "India", value: "India" }],
  },
  {
    type: "select",
    name: "state",
    label: "State",
    required: true,
    placeholder: "Select state",
    options: getSelectFormattedData(states),
  },
  {
    type: "text",
    required: true,
    label: "District",
    name: "district",
    placeholder: "Enter District",
  },

  {
    type: "br",
    name: "docs",
    label: "Documents",
    widthFull: true,
  },
  {
    type: "text",
    name: "aadhaar",
    label: "Aadhar Number",
    placeholder: "Enter Aadhar Number",
  },
  {
    type: "text",
    name: "panNumber",
    label: "PAN Number",
    placeholder: "Enter PAN Number",
  },
  {
    type: "text",
    name: "kisanId",
    required: true,
    label: "KISAN ID",
    placeholder: "Enter KISAN ID",
  },
  {
    type: "text",
    required: true,
    name: "egannaId",
    label: "E-Ganna ID",
    placeholder: "Enter E-Ganna ID",
  },
  {
    name: "profile",
    label: "Profile Pic",
    type: "file",
    required: true,
  },
];
