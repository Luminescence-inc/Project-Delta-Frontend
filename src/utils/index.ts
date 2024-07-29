import { CloudinaryConfig } from "@/config";
import type { ISearch } from "@/types/business-profile";

const defaultImg = "/assets/images/default-img.jpeg";

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
  if (!daysOfOperation || Object.entries(daysOfOperation).length === 0)
    return { isOpened: false, closingTime: null };

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
    const closingTime = parseInt(day?.ct!?.split(":")[0]);
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

export const capitalizeFirstLetter = (str: string) => {
  if (!str || str.length === 0) return str;

  return str.slice(0, 1).toUpperCase() + str.slice(1);
};

export const isImgUrlValid = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (e: unknown) {
    return false;
  }
};

export const isUrlValid = (url: string) => {
  try {
    // first stage of validation
    new URL(url);

    // second stage (regexp)
    const urlRegex =
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    const result = url.match(urlRegex);

    return result !== null;
  } catch (e: any) {
    return false;
  }
};

export const constructBizImgUrl = (url: string | null) => {
  return !url
    ? defaultImg
    : `https://res.cloudinary.com/${CloudinaryConfig.cloudName}/image/upload/c_fill,q_500/${url}.jpg`;
};

const replacedFilterNames = {
  businessCategoryUuid: "cat",
  stateAndProvince: "st",
  state: "st",
  city: "cty",
  country: "cn",
  limit: "limit",
  page: "page",
  sortBy: "sortBy",
  sortDirection: "sortDirection",
  query: "query",
  layout: "layout",
};

// extract query params from the address bar
export const extractQueryParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const filters: ISearch["filters"] = [];
  const queryReplacements = ["cat", "st", "cty", "cn"];

  for (const [key, value] of urlParams) {
    if (queryReplacements.includes(key)) {
      switch (key) {
        case "cat":
          filters.push({
            targetFieldName: "businessCategoryUuid",
            values: [decodeURIComponent(value)],
          });
          break;
        case "st":
          filters.push({
            targetFieldName: "stateAndProvince",
            values: [capitalizeFirstLetter(value)],
          });
          break;
        case "cty":
          filters.push({
            targetFieldName: "city",
            values: [capitalizeFirstLetter(value)],
          });
          break;
        case "cn":
          filters.push({
            targetFieldName: "country",
            values: [capitalizeFirstLetter(value)],
          });
          break;
      }
      continue;
    }

    if (typeof key !== "undefined") {
      filters.push({
        targetFieldName: key as keyof ISearch,
        values: value.split(","),
      });
    }
  }

  return { filters };
};

type QueryKey = keyof typeof replacedFilterNames;

export const constructSearchUrl = (
  searchQuery: ISearch,
  pagination?: {
    page: number;
    limit?: number;
    sortBy?: string;
    sortDirection?: string;
  }
) => {
  const query: string[] = [];
  searchQuery.filters.forEach((filter) => {
    const values = filter.values.join(",");
    if (values.length > 0) {
      query.push(
        `${replacedFilterNames[filter.targetFieldName as QueryKey]}=${encodeURI(
          values
        )}`
      );
    }
  });

  // pagination
  if (pagination) {
    for (const [key, value] of Object.entries(pagination)) {
      query.push(`${key}=${value}`);
    }
  }

  return query.join("&");
};

export const forceReloadClientPage = (time?: number) => {
  // force reload the page to update the search query
  // fetch business data
  // apply dynamic seo.
  setTimeout(() => {
    window.location.reload();
  }, time ?? 10);
};
