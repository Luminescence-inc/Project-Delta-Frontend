"use client";
import { allBusinessCategories, searchForBusinesses } from "@/api/business";
import React, { PropsWithChildren, useEffect, useState } from "react";
import {
  BusinessCategories,
  BusinessListingLayouts,
  IOption,
} from "@/types/business";
import { IBusinessProfile, ISearch } from "@/types/business-profile";
import { constructSearchUrl } from "@/utils";
import useLocationBasedFilters from "@/hooks/useLocationBasedFilters";

export const BusinessContext = React.createContext<ContextValues>({} as any);

interface FilterOption {
  uuid: string;
  value: string;
}

export interface FilterData {
  businessCategoryUuid: { uuid?: string; value?: string }[] | undefined;
  stateAndProvince: { uuid: string } | undefined;
  city: { uuid: string } | undefined;
  country: { uuid: string } | undefined;
  page?: { uuid: string } | undefined;
}

interface ContextValues {
  searchQuery: ISearch | null;
  setSearchQuery: (searchQuery: ISearch | null) => void;
  activePanel: string;
  setActivePanel: (panel: string) => void;
  filteredCities: FilterOption[];
  setFilteredCities: (cities: FilterOption[]) => void;
  filteredStates: FilterOption[];
  setFilteredStates: (states: FilterOption[]) => void;
  filterData: FilterData;
  setFilterData: (filterData: FilterData) => void;
  businesses: IBusinessProfile[] | [];
  setBusinesses: (businesses: IBusinessProfile[] | []) => void;
  businessCategory: IOption[] | undefined;
  setBusinessCategory: (businessCategory: IOption[] | undefined) => void;
  allBusinessesLoading: boolean;
  setAllBusinessesLoading: (loading: boolean) => void;
  currPage: number;
  setCurrPage: (page: number) => void;
  totalPages: number;
  setTotalPages: (pages: number) => void;
  getBusinesses: (currPage: number, filterApplied: boolean) => void;
  layout?: BusinessListingLayouts;
  setLayout?: (layout: BusinessListingLayouts) => void;
  socialLinksError: string | null;
  setSocialLinksError: (error: string | null) => void;
}

interface BusinessContextProviderProps extends PropsWithChildren {}

export default function BusinessContextProvider({
  children,
}: BusinessContextProviderProps) {
  const [businesses, setBusinesses] = useState<IBusinessProfile[] | []>([]);
  const [allBusinessesLoading, setAllBusinessesLoading] =
    useState<boolean>(true);
  const [currPage, setCurrPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [businessCategory, setBusinessCategory] = useState<IOption[]>();

  // for filtering business profiles
  const [searchQuery, setSearchQuery] = useState<ISearch | null>(null);
  const [activePanel, setActivePanel] = React.useState<string>("");
  const [filteredCities, setFilteredCities] = React.useState<any>([]);
  const [filteredStates, setFilteredStates] = React.useState<any>([]);
  const [filterData, setFilterData] = React.useState<FilterData>({
    businessCategoryUuid: undefined,
    stateAndProvince: undefined,
    city: undefined,
    country: undefined,
  });

  // for businesses layout cards
  const [layout, setLayout] = useState<BusinessListingLayouts>("col");

  // businss registeration.
  const [socialLinksError, setSocialLinksError] = useState<string | null>(null);

  // location based filters
  useLocationBasedFilters({
    searchQuery,
    setSearchQuery,
    setFilterData,
    filterData,
    bizCategories: businessCategory,
    getBusinesses: (currPage, filterApplied, searchQuery) => {
      getBusinesses(currPage, filterApplied, searchQuery);
    },
  });

  // all business categories
  useEffect(() => {
    try {
      allBusinessCategories().then((res) => {
        const resData: BusinessCategories = res.data;
        setBusinessCategory(
          resData.data.businessCategories.map((businessCat) => {
            return { uuid: businessCat.uuid, value: businessCat.description };
          })
        );
      });
    } catch (err) {}
  }, []);

  const getBusinesses = async (
    currPage: number,
    filterApplied: boolean,
    filter?: ISearch
  ) => {
    setAllBusinessesLoading(true);

    const queryParams = constructSearchUrl(
      filter || searchQuery || { filters: [] }
    );

    // update the address bar with the search query
    // only do this when in search page
    const isSearchPage =
      window.location.pathname.split("/")[1].toLowerCase() === "search";

    if (isSearchPage) {
      const url = `/search?${queryParams}`;
      window.history.pushState({}, "", url);
    }

    const result = await searchForBusinesses(queryParams);
    const data = result.data?.data.businessProfiles;

    setAllBusinessesLoading(false);

    // remove any duplicates
    if (!filterApplied) {
      const comb = [...businesses, ...data?.data];
      const unique = comb.filter(
        (v, i, a) => a.findIndex((t) => t.uuid === v.uuid) === i
      );
      setBusinesses(unique);
    } else {
      setBusinesses(data.data);
    }

    setTotalPages(data?.totalPages || 1);
    setCurrPage(currPage);
  };

  const ctxValues = {
    searchQuery,
    setSearchQuery,
    activePanel,
    setActivePanel,
    filteredCities,
    setFilteredCities,
    filteredStates,
    setFilteredStates,
    filterData,
    setFilterData,
    businesses,
    setBusinesses,
    businessCategory,
    setBusinessCategory,
    allBusinessesLoading,
    setAllBusinessesLoading,
    currPage,
    setCurrPage,
    totalPages,
    setTotalPages,
    getBusinesses,
    layout,
    setLayout,
    socialLinksError,
    setSocialLinksError,
  } satisfies ContextValues;

  return (
    <BusinessContext.Provider value={ctxValues}>
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusinessCtx() {
  return React.useContext(BusinessContext);
}
