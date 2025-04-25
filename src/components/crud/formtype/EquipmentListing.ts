import { FormField } from "@/hooks/types";

export const EquipmentListing: FormField[] = [
  {
    name: "name",
    type: "text",
    required: true,
    label: "Name",
    widthFull: true,
    placeholder: "Enter Name",
  },
  {
    rows: 5,
    required: true,
    type: "textarea",
    label: "Description",
    widthFull: true,
    name: "description",
    placeholder: "Enter description",
  },
  {
    name: "cost",
    maxLength: 8,
    required: true,
    label: "Price (in Rupee)",
    type: "stringNumeric",
    placeholder: "Enter price",
  },
  {
    type: "select",
    required: true,
    label: "Equipment Type",
    name: "equipmentTypeId",
    placeholder: "Select Equipment Type",
    options: [],
  },
  {
    name: "image",
    type: "file",
    required: true,
    label: "Cover Image",
  },
];
