import { extractQueryParams } from "@/utils";
import { useEffect } from "react";
import { useLocation } from "@/hooks/useLocation";
import countryHelpers from "@/helpers/country-sate-city/country";
import type { ISearch } from "@/types/business-profile";

interface useLocBaseFilterProps {
  searchQuery: ISearch | null;
  getBusinesses: (
    currPage: number,
    filterApplied: boolean,
    searchQuery: any
  ) => void;
}

export default function useLocationBasedFilters({
  searchQuery,
  getBusinesses,
}: useLocBaseFilterProps) {
  const { location, loading } = useLocation();

  useEffect(() => {
    if (loading) return;

    const { filters } = extractQueryParams();
    const applyFilter = filters.length > 0 || searchQuery ? true : false;

    // check if country is in the filters
    const countryFilter = filters.find((f) => f.targetFieldName === "country");

    // if there is a country filter, then add it to the filter data
    if (!countryFilter) {
      const countrySupported = countryHelpers.isCountrySupported(
        location?.countryCode!
      );

      if (!countrySupported) {
        filters.push({
          targetFieldName: "country",
          values: ["Canada"],
        });
      } else {
        if (location) {
          for (const key of Object.keys(location)) {
            if (key === "country") {
              filters.push({
                targetFieldName: "country",
                values: [location[key] as string],
              });
            }

            if (key === "state") {
              filters.push({
                targetFieldName: "stateAndProvince",
                values: [location[key] as string],
              });
            }

            if (key === "city") {
              filters.push({
                targetFieldName: "city",
                values: [location[key] as string],
              });
            }
          }
        }
      }
    }

    // check if the country in the filter is supported
    const countryFilterIndex = filters.findIndex(
      (f) => f.targetFieldName === "country"
    );

    if (countryFilterIndex > -1) {
      const countrySupported = countryHelpers.isCountrySupported(
        filters[countryFilterIndex].values[0]
      );

      // check the country sent from location hook if it supported, if it is
      // use that otherwise, fallback to Canada
      const countrySupportedFromLocation = countryHelpers.isCountrySupported(
        location?.countryCode!
      );

      if (!countrySupported && !countrySupportedFromLocation) {
        filters[countryFilterIndex].values = ["Canada"];
      } else {
        filters[countryFilterIndex].values = [location?.country!];
      }
    }

    const comboFilters = [...(searchQuery?.filters ?? []), ...filters];
    const uniqueFilters = comboFilters.filter(
      (v, i, a) =>
        a.findIndex((t) => t.targetFieldName === v.targetFieldName) === i
    );

    getBusinesses(1, applyFilter, { filters: uniqueFilters });
  }, [searchQuery, loading, location]);
}
