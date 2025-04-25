import { Put } from "./apiUtils";

export const functionList: Record<string, (data: any) => Promise<boolean>> = {
  Quotation: async (data: any) => {
    if (!data?._id) return false;
    try {
      const url = `/api/quotation/update-status/${data._id}`;
      const response: any = await Put(url, { status: data.status });
      return response?.success ?? false;
    } catch (error) {
      console.log("Error updating quotation status:", error);
      return false;
    }
  },
  Purchase: async (data: any) => {
    if (!data?._id) return false;
    try {
      const url = `/api/purchase/update-status/${data._id}`;
      const response: any = await Put(url, { stockAdded: data.status });
      return response?.success ?? false;
    } catch (error) {
      console.log("Error updating quotation status:", error);
      return false;
    }
  },
  Packing: async (data: any) => {
    if (!data?._id) return false;
    try {
      const url = `/api/packing/update-status/${data._id}`;
      const response: any = await Put(url, { packed: JSON.parse(data.status) });
      return response?.success ?? false;
    } catch (error) {
      console.log("Error updating quotation status:", error);
      return false;
    }
  },
};
