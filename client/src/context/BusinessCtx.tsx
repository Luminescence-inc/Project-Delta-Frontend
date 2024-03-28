import React, { PropsWithChildren, useState } from "react";
import { ISearch } from "types/business-profile";

export const BusinessContext = React.createContext<ContextValues>({} as any);

type FilterOption = {
  uuid: string;
  value: string;
};

export type FilterData = {
  businessCategoryUuid: { uuid?: string; value?: string }[] | undefined;
  stateAndProvince: { uuid: string } | undefined;
  city: { uuid: string } | undefined;
  country: { uuid: string } | undefined;
};

type ContextValues = {
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
};

interface BusinessContextProviderProps extends PropsWithChildren {}

export default function BusinessContextProvider({
  children,
}: BusinessContextProviderProps) {
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
