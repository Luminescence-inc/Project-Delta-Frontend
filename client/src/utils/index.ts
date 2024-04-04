import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms * 1000));

// determine whether a business is opened or close.
// if it open, return true and closing time for that day,
// otherwise false and null for that day
type DaysOfOperation = {
  day: string | null;
  ot: string | null; // open time
  ct: string | null; // closing time
};

export const determineBusOpTime = (daysOfOperation: DaysOfOperation[]) => {
  const daysOfWeeks = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const today = new Date().getDay();
  const day = daysOfOperation.find(
    (d) => d.day!.toLowerCase() === daysOfWeeks[today]
  );
  if (day) {
    const currentTime = Math.abs(new Date().getHours() - 12);
    const closingTime = parseInt(day.ct!.split(":")[0]);
    return currentTime < closingTime
      ? {
          isOpened: true,
          closingTime: day.ct,
        }
      : {
          isOpened: false,
          closingTime: null,
        };
  }
  return { isOpened: false, closingTime: null };
};

export const isImgUrlValid = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (e: unknown) {
    return false;
  }
};
