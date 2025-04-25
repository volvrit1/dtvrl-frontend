import { assign, includes } from "./polyfills";

export function formatDate(inputDate: any) {
  const date = new Date(inputDate);

  // Get the year, month, and day
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
  const day = String(date.getDate()).padStart(2, "0"); // Pad single digit days with a leading zero

  // Return in YYYY-MM-DD format
  return `${year}-${month}-${day}`;
}

export function formatTime(inputTime: any) {
  const options = {
    year: "numeric",
    weekday: "long",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return inputTime.toLocaleString("en-US", options);
}

export const format12Hour = (time: any) => {
  const date = new Date(time);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

export const debounce = (func: any, delay: number) => {
  let timeoutId: NodeJS.Timeout | null = null;
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const getAccessPoints = (
  user: any,
  label: string,
  viewStock?: boolean
) => {
  const userPermissions = user?.permissions ?? [];
  let accessPoints: any = userPermissions.filter(
    (e: any) => e.module === label
  );
  if (accessPoints && accessPoints.length > 0)
    accessPoints = accessPoints[0]?.access;
  else accessPoints = {};

  if (viewStock) return { ...accessPoints, viewStock: viewStock };
  else return accessPoints;
};

export const populateFormFields = (
  fields: any,
  product: any,
  disabledFields?: any
) => {
  return fields.map((field: any) => {
    if (product.hasOwnProperty(field.name))
      return {
        ...field,
        value: product[field.name],
        isDisabled:
          disabledFields && includes(disabledFields, field.name)
            ? true
            : field.isDisabled,
      };
    return field;
  });
};

export const populateFormData = (fields: any, product: any) => {
  const object = {};
  fields.map((field: any) => {
    if (product.hasOwnProperty(field.name)) {
      assign(object, { [field.name]: product[field.name] });
    }
  });
  return object;
};

export const updateFormData = (
  formData: FormData,
  nestedFieldKey: string,
  nestedFields: string[],
  fieldsToRemove: string[]
) => {
  const updatedFormData = new FormData();
  const nestedData: Record<string, any> = {};
  for (const [key, value] of formData.entries()) {
    if (nestedFields.includes(key)) nestedData[key] = value;
    else if (!fieldsToRemove.includes(key)) updatedFormData.append(key, value);
  }
  updatedFormData.append(nestedFieldKey, JSON.stringify(nestedData));
  return updatedFormData;
};

export const getSelectFormattedData = (data: any) => {
  const response = data.map((option: any) => ({
    label: option?._id,
    value: option?.name,
    email: option?.email,
  }));
  return response;
};

export function nestFields(
  obj: Record<string, any>,
  key: string,
  fieldsToNest: string[]
): Record<string, any> {
  const nestedObject: Record<string, any> = {};
  const updatedObject: Record<string, any> = { ...obj };

  fieldsToNest.forEach((field) => {
    if (field in updatedObject) {
      nestedObject[field] = updatedObject[field];
      delete updatedObject[field];
    }
  });
  updatedObject[key] = nestedObject;
  return updatedObject;
}

type NestedObject = {
  [key: string]: any;
};

export function removeSuffixInNestedObject(
  obj: NestedObject,
  nestedKey: string,
  suffix: string
): NestedObject {
  const nestedObj = obj[nestedKey];

  if (!nestedObj || typeof nestedObj !== "object") {
    return obj; // Return the original object if nestedKey is invalid
  }

  const updatedNestedObj = Object.entries(nestedObj).reduce(
    (acc: NestedObject, [key, value]) => {
      const newKey = key.replace(new RegExp(`${suffix}$`), ""); // Remove the suffix
      acc[newKey] = value;
      return acc;
    },
    {}
  );

  return {
    ...obj,
    [nestedKey]: updatedNestedObj, // Update the nested object
  };
}

export const formatRupee = (amount: any) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatCompactNumber = (num: number) => {
  if (!num) return "-";

  if (num >= 1_00_00_00_000) {
    return (num / 1_00_00_00_000).toFixed(2) + "T"; // Trillion
  } else if (num >= 1_00_00_00_000) {
    return (num / 1_00_00_00_000).toFixed(2) + "B"; // Billion
  } else if (num >= 1_00_00_000) {
    return (num / 1_00_00_000).toFixed(2) + "Cr"; // Crore
  } else if (num >= 1_00_000) {
    return (num / 1_00_000).toFixed(2) + "L"; // Lakh
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(2) + "K"; // Thousand
  }
  return num.toString(); // Less than 1000, return as is
};

export const formatIndianCurrency = (amount: number) => {
  let formattedAmount: string;
  if (!amount) return "-";

  if (amount >= 1_00_00_00_000) {
    formattedAmount = (amount / 1_00_00_00_000).toFixed(2) + "T"; // Trillion
  } else if (amount >= 1_00_00_000) {
    formattedAmount = (amount / 1_00_00_000).toFixed(2) + "Cr"; // Crore
  } else if (amount >= 1_00_000) {
    formattedAmount = (amount / 1_00_000).toFixed(2) + "L"; // Lakh
  } else if (amount >= 1_000) {
    formattedAmount = (amount / 1_000).toFixed(2) + "K"; // Thousand
  } else {
    formattedAmount = amount.toFixed(2); // Normal amount
  }

  return `₹${formattedAmount}`;
};

export const formatCurrency = (value: number | undefined) =>
  value && !isNaN(value)
    ? new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
      }).format(value)
    : "₹0.00";

export const convertTo24Hour = (time: string): string => {
  console.log(time);
  const [timePart, period] = time.split(" ");
  let [hours] = timePart.split(":").map(Number);
  const [, minutes] = timePart.split(":").map(Number);

  if (period === "PM" && hours !== 12) {
    hours += 12;
  } else if (period === "AM" && hours === 12) {
    hours = 0;
  }
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};

export const groupAndFilterSlots = (slots: any[]): any => {
  const groupedSlots: Record<string, any[]> = {};
  slots.forEach((slot) => {
    if (!groupedSlots[slot.date]) {
      groupedSlots[slot.date] = [];
    }
    groupedSlots[slot.date].push({
      _id: slot._id,
      date: slot.date,
      end_time: slot.endTime,
      start_time: slot.startTime,
    });
  });
  return groupedSlots;
};

export const filterUpcomingSlots = (slots: any) => {
  const currentTime = new Date();
  const currentDate = currentTime.toISOString().split("T")[0]; // Get YYYY-MM-DD format
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();

  const parseTime = (time: string) => {
    const [hourMinute, period] = time.split(" ");
    let [hours] = hourMinute.split(":").map(Number);
    const [, minutes] = hourMinute.split(":").map(Number);
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    return { hours, minutes };
  };

  return slots.filter(({ start_time, date }: any) => {
    if (date !== currentDate) return true; // If not today, return all

    const { hours, minutes } = parseTime(start_time);
    return (
      hours > currentHours ||
      (hours === currentHours && minutes > currentMinutes)
    );
  });
};

export function filterFutureSlots(slotsByDate: any) {
  const now = new Date();
  const filtered: any = {};
  Object.entries(slotsByDate).forEach(([dateKey, slots]: any) => {
    const filteredSlots = slots.filter((slot: any) => {
      // Fix for Safari or inconsistent date parsing: parse manually
      const [hourMin, meridiem] = slot.start_time.split(" ");
      let [hours] = hourMin.split(":").map(Number);
      const [, minutes] = hourMin.split(":").map(Number);
      if (meridiem === "PM" && hours < 12) hours += 12;
      if (meridiem === "AM" && hours === 12) hours = 0;

      const [year, month, day] = slot.date.split("-").map(Number);
      const slotDateObj = new Date(year, month - 1, day, hours, minutes);

      return slotDateObj.getTime() > now.getTime();
    });

    if (filteredSlots.length > 0) {
      filtered[dateKey] = filteredSlots;
    }
  });

  return filtered;
}

export const getDatesBetween = (
  startDate: string,
  endDate: string
): string[] => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (start > end) {
    throw new Error("Start date cannot be after the end date");
  }
  const datesArray: string[] = [];
  const currentDate = new Date(start);
  while (currentDate <= end) {
    datesArray.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return datesArray;
};

export function normalizeUploadPath(path: string): string {
  const normalized = path.replace(/\\/g, "/").replace(/\/+/g, "/");
  return normalized.startsWith("/") ? normalized : `/${normalized}`;
}
