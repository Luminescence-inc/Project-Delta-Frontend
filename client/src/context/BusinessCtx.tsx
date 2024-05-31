import { allBusinessCategories, searchForBusinesses } from "@/api/business";
import React, { PropsWithChildren, useEffect, useState } from "react";
import {
  BusinessCategories,
  BusinessListingLayouts,
  IOption,
} from "@/types/business";
import { IBusinessProfile, ISearch } from "@/types/business-profile";
import { constructSearchUrl, extractQueryParams } from "@/utils";
import { useLocation } from "@/hooks/useLocation";

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

  const { location, loading } = useLocation();
  const _loc = window.location;

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

  // fetch all businesses initially with or without a filter
  useEffect(() => {
    if (loading) return;

    const { filters } = extractQueryParams();
    const applyFilter = filters.length > 0 || searchQuery ? true : false;

    // check if country is in the filters
    const countryFilter = filters.find((f) => f.targetFieldName === "country");

    // if there is a country filter, then add it to the filter data
    if (!countryFilter) {
      filters.push({
        targetFieldName: "country",
        values: [location?.country ?? "Canada"],
      });
    }

    const comboFilters = [...(searchQuery?.filters ?? []), ...filters];
    const uniqueFilters = comboFilters.filter(
      (v, i, a) =>
        a.findIndex((t) => t.targetFieldName === v.targetFieldName) === i
    );

    getBusinesses(1, applyFilter, { filters: uniqueFilters });
  }, [_loc.pathname, _loc.search, searchQuery, loading]);

  const getBusinesses = async (
    currPage: number,
    filterApplied: boolean,
    filter?: ISearch
  ) => {
    const queryParams = constructSearchUrl(
      filter || searchQuery || { filters: [] }
    );

    // update the address bar with the search query
    // only do this when in search page
    const isSearchPage =
      window.location.pathname.split("/")[1].toLowerCase() === "search";

    if (isSearchPage)
      window.history.pushState({}, "", `/search?${queryParams}`);

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
