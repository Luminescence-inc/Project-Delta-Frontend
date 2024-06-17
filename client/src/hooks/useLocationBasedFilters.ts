import { extractQueryParams } from "@/utils";
import { useEffect, useMemo } from "react";
import { useLocation } from "@/hooks/useLocation";
import countryHelpers from "@/helpers/country-sate-city/country";
import type { ISearch } from "@/types/business-profile";
import { type FilterData } from "@/context/BusinessCtx";
import type { IOption } from "@/types/business";
import usePathname from "./usePathname";

interface useLocBaseFilterProps {
  searchQuery: ISearch | null;
  setSearchQuery: (searchQuery: ISearch | null) => void;
  setFilterData: (filterData: FilterData) => void;
  filterData: FilterData;
  bizCategories: IOption[] | undefined;
  getBusinesses: (
    currPage: number,
    filterApplied: boolean,
    searchQuery: any
  ) => void;
}

export default function useLocationBasedFilters({
  searchQuery,
  setFilterData,
  filterData,
  bizCategories,
  getBusinesses,
  setSearchQuery,
}: useLocBaseFilterProps) {
  const { location, loading } = useLocation();
  const { search } = usePathname();

  const uniqueFilters = useMemo(() => {
    if (loading) return [];

    const { filters } = extractQueryParams();
    // Check if country is in the filters
    const countryFilter = filters.find((f) => f.targetFieldName === "country");

    if (!countryFilter) {
      const countrySupported = countryHelpers.isCountrySupported(
        location?.countryCode!
      );
      if (!countrySupported) {
        filters.push({ targetFieldName: "country", values: ["Canada"] });
      } else if (location) {
        const { country, state, city } = location;
        if (country)
          filters.push({ targetFieldName: "country", values: [country] });
        if (state)
          filters.push({
            targetFieldName: "stateAndProvince",
            values: [state],
          });
        if (city) filters.push({ targetFieldName: "city", values: [city] });
      }
    } else {
      const countryFilterIndex = filters.findIndex(
        (f) => f.targetFieldName === "country"
      );
      if (countryFilterIndex > -1) {
        const countrySupported = countryHelpers.isCountrySupported(
          filters[countryFilterIndex].values[0]
        );
        const countrySupportedFromLocation = countryHelpers.isCountrySupported(
          location?.countryCode!
        );
        if (!countrySupported && !countrySupportedFromLocation) {
          filters[countryFilterIndex].values = ["Canada"];
        } else {
          filters[countryFilterIndex].values = [location?.country!];
        }
      }
    }

    // const comboFilters = [...(searchQuery?.filters ?? []), ...filters];
    const comboFilters = [...(searchQuery?.filters ?? filters)];
    const nonDuplicateFilters = comboFilters.filter(
      (v, i, a) =>
        a.findIndex((t) => t.targetFieldName === v.targetFieldName) === i
    );
    return nonDuplicateFilters;
  }, [searchQuery, loading, search, location]);

  useEffect(() => {
    if (loading) return;
    const currentFilters = searchQuery?.filters || [];
    const filtersChanged =
      currentFilters.length !== uniqueFilters.length ||
      uniqueFilters.some(
        (filter, index) =>
          filter.targetFieldName !== currentFilters[index]?.targetFieldName
      );

    if (filtersChanged) {
      console.log("Filters changed");
      setSearchQuery({
        filters: uniqueFilters,
      });
      getBusinesses(1, uniqueFilters.length > 0, { filters: uniqueFilters });
    } else {
      console.log("Filters not changed");
      getBusinesses(1, uniqueFilters.length > 0, { filters: uniqueFilters });
    }
  }, [uniqueFilters, loading, location]);

  useEffect(() => {
    const newFilterData = updateFilter(
      filterData,
      uniqueFilters,
      bizCategories
    );
    setFilterData(newFilterData);
  }, [uniqueFilters]);

  return uniqueFilters;
}

function updateFilter(
  filterData: FilterData,
  uniqueFilters: ISearch["filters"],
  bizCategories: IOption[] | undefined
) {
  const newFilterData = { ...filterData } as FilterData;

  uniqueFilters.forEach((filter) => {
    switch (filter.targetFieldName) {
      case "businessCategoryUuid":
        const categories = bizCategories?.find((c) =>
          c.value.includes(filter.values[0])
        );
        newFilterData.businessCategoryUuid = [
          {
            uuid: categories?.uuid,
            value: filter.values[0],
          },
        ];
        break;
      case "stateAndProvince":
        newFilterData.stateAndProvince = { uuid: filter.values[0] };
        break;
      case "city":
        newFilterData.city = { uuid: filter.values[0] };
        break;
      case "country":
        newFilterData.country = { uuid: filter.values[0] };
        break;
    }
  });

  return newFilterData;
}
