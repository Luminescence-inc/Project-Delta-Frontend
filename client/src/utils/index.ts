import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms * 1000));

export const removeAMPM = (time: string) => {
  return time.replace(/(am|pm|AM|PM)/gi, "");
};

interface DaysOfOperation {
  day: string | null;
  ot: string | null; // open time
  ct: string | null; // closing time
}

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
          closingTime: removeAMPM(day.ct!) + "PM",
        }
      : {
          isOpened: false,
          closingTime: null,
        };
  }
  return { isOpened: false, closingTime: null };
};

export const constructDOP = (
  daysOfWeek: string[] | null,
  openTime: string | null,
  closeTime: string | null
) => {
  return daysOfWeek?.map((day) => {
    return {
      day: day,
      ot: openTime,
      ct: closeTime,
    };
  });
};

export const isImgUrlValid = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (e: unknown) {
    return false;
  }
};
