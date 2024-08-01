import { bizConnectAPI } from "@/config";
import axios from "axios";

type Empty = null | undefined;

// Function to generate the title based on the filters and number of businesses
export function generateTitle({
  query,
  city,
  state,
  country,
  businessesLength,
}: {
  query?: string | Empty;
  city?: string | Empty;
  state?: string | Empty;
  country?: string | Empty;
  businessesLength?: number | Empty;
}) {
  let title = `Explore ${query ? `"${query}" Businesses` : "Businesses"}`;

  if (businessesLength === 0) {
    title = `No result for${
      query ? ` '${query}'` : " businesses"
    } ${generateLocationHeadline(city, state, country)}`;
  } else {
    title += generateLocationSuffix(city, state, country);
  }

  return title;
}

// Function to generate location headline based on city, state, and country
export function generateLocationHeadline(
  city?: string | Empty,
  state?: string | Empty,
  country?: string | Empty
) {
  if (city) return `Near '${city}'`;
  if (state) return `Near '${state}'`;
  if (country) return `In '${country}'`;
  return "Near You";
}

// Function to generate location suffix for the title
export function generateLocationSuffix(
  city: string | Empty,
  state: string | Empty,
  country: string | Empty
) {
  if (city && state) return ` Near ${city}, ${state}`;
  if (state && country) return ` Near ${state}, ${country}`;
  if (city) return ` Near ${city}`;
  if (state) return ` Near ${state}`;
  if (country) return ` in ${country}`;
  return " Near You";
}

// Function to extract query parameters from URL
const replacedFilterNamesReverse = {
  cn: "country",
  st: "state",
  cty: "city",
  cat: "businessCategoryUuid",
  limit: "limit",
  page: "page",
  sortBy: "sortBy",
  sortDirection: "sortDirection",
  query: "query",
  layout: "layout",
};

type QueryKey = keyof typeof replacedFilterNamesReverse;

export function extractQueryParam(url: string) {
  const search = new URL(url).search;
  const urlParams = new URLSearchParams(search);
  const filters: {
    country?: string | Empty;
    state?: string | Empty;
    city?: string | Empty;
    query?: string | Empty;
    businessCategoryUuid?: string | Empty;
    limit?: string | Empty;
    page?: string | Empty;
    sortBy?: string | Empty;
    sortDirection?: string | Empty;
    layout?: string | Empty;
  } = {};

  for (const [key, value] of urlParams.entries()) {
    const filterName = replacedFilterNamesReverse[key as QueryKey];
    if (filterName) {
      // @ts-expect-error
      filters[filterName] = value;
    }
  }
  return {
    filters,
    search,
  };
}

// Function to fetch businesses based on query parameters
export async function getBusinesses(queryParams: string) {
  const url = `${bizConnectAPI.baseURL}/api/businesses/search${queryParams}`;
  const result = await axios.get(url);
  return result.data?.data.businessProfiles.data || [];
}

export async function getBusinessesWithPagination(queryParams: string) {
  const url = `${bizConnectAPI.baseURL}/api/businesses/search${queryParams}`;
  const result = await axios.get(url);
  return {
    businesses: result.data?.data.businessProfiles.data || [],
    pagination: {
      totalPages: result.data?.data?.businessProfiles.totalPages,
      total: result.data?.data?.businessProfiles.total,
      limit: result.data?.data?.businessProfiles.limit,
      page:
        result.data?.data?.businessProfiles.page === 0
          ? 1
          : result.data?.data?.businessProfiles.page,
    },
  };
}
