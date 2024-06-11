import { extractQueryParams } from "@/utils";
import { useEffect, useMemo } from "react";
import { useLocation } from "@/hooks/useLocation";
import countryHelpers from "@/helpers/country-sate-city/country";
import type { ISearch } from "@/types/business-profile";
import { type FilterData } from "@/context/BusinessCtx";
import type { IOption } from "@/types/business";
import usePathname from "./usePathname";

// interface useLocBaseFilterProps {
//   searchQuery: ISearch | null;
//   setSearchQuery: (searchQuery: ISearch | null) => void;
//   getBusinesses: (
//     currPage: number,
//     filterApplied: boolean,
//     searchQuery: any
//   ) => void;
// }

// export default function useLocationBasedFilters({
//   searchQuery,
//   setSearchQuery,
//   getBusinesses,
// }: useLocBaseFilterProps) {
//   const { location, loading } = useLocation();

//   useEffect(() => {
//     if (loading) return;

//     const { filters } = extractQueryParams();
//     const applyFilter = filters.length > 0 || searchQuery ? true : false;

//     // check if country is in the filters
//     const countryFilter = filters.find((f) => f.targetFieldName === "country");

//     // if there is a country filter, then add it to the filter data
//     if (!countryFilter) {
//       const countrySupported = countryHelpers.isCountrySupported(
//         location?.countryCode!
//       );

//       if (!countrySupported) {
//         filters.push({
//           targetFieldName: "country",
//           values: ["Canada"],
//         });
//       } else {
//         if (location) {
//           for (const key of Object.keys(location)) {
//             if (key === "country") {
//               filters.push({
//                 targetFieldName: "country",
//                 values: [location[key] as string],
//               });
//             }

//             if (key === "state") {
//               filters.push({
//                 targetFieldName: "stateAndProvince",
//                 values: [location[key] as string],
//               });
//             }

//             if (key === "city") {
//               filters.push({
//                 targetFieldName: "city",
//                 values: [location[key] as string],
//               });
//             }
//           }
//         }
//       }
//     }

//     // check if the country in the filter is supported
//     const countryFilterIndex = filters.findIndex(
//       (f) => f.targetFieldName === "country"
//     );

//     if (countryFilterIndex > -1) {
//       const countrySupported = countryHelpers.isCountrySupported(
//         filters[countryFilterIndex].values[0]
//       );

//       // check the country sent from location hook if it supported, if it is
//       // use that otherwise, fallback to Canada
//       const countrySupportedFromLocation = countryHelpers.isCountrySupported(
//         location?.countryCode!
//       );

//       if (!countrySupported && !countrySupportedFromLocation) {
//         filters[countryFilterIndex].values = ["Canada"];
//       } else {
//         filters[countryFilterIndex].values = [location?.country!];
//       }
//     }

//     const comboFilters = [...(searchQuery?.filters ?? []), ...filters];
//     const uniqueFilters = comboFilters.filter(
//       (v, i, a) =>
//         a.findIndex((t) => t.targetFieldName === v.targetFieldName) === i
//     );

//     // update the filter component with the state of filter
//     // setSearchQuery({
//     //   filters: uniqueFilters,
//     // });

//     // invoke the getBusinesses function
//     getBusinesses(1, applyFilter, { filters: uniqueFilters });
//   }, [searchQuery, loading, location]);
// }

interface useLocBaseFilterProps {
  searchQuery: ISearch | null;
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
}: useLocBaseFilterProps) {
  const { location, loading } = useLocation();
  const { search } = usePathname();

  const uniqueFilters = useMemo(() => {
    if (loading) return [];

    const { filters } = extractQueryParams();

    // const applyFilter = filters.length > 0 || searchQuery ? true : false;

    // check if country is in the filters
    const countryFilter = filters.find((f) => f.targetFieldName === "country");

    // if there is no country filter, add the location details to the filters
    if (!countryFilter) {
      const countrySupported = countryHelpers.isCountrySupported(
        location?.countryCode!
      );

      if (!countrySupported) {
        filters.push({
          targetFieldName: "country",
          values: ["Canada"],
        });
      } else if (location) {
        const { country, state, city } = location;
        if (country) {
          filters.push({
            targetFieldName: "country",
            values: [country],
          });
        }
        if (state) {
          filters.push({
            targetFieldName: "stateAndProvince",
            values: [state],
          });
        }
        if (city) {
          filters.push({
            targetFieldName: "city",
            values: [city],
          });
        }
      }
    }

    // Validate the country in the filters
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

    const comboFilters = [...(searchQuery?.filters ?? []), ...filters];
    const nonDuplicateFilters = comboFilters.filter(
      (v, i, a) =>
        a.findIndex((t) => t.targetFieldName === v.targetFieldName) === i
    );
    return nonDuplicateFilters;
  }, [searchQuery, loading, location, search]);

  useEffect(() => {
    if (loading) return;

    const currentFilters = searchQuery?.filters || [];
    const applyFilter = uniqueFilters.length > 0 || searchQuery ? true : false;

    // Check if the current filters and the unique filters are different
    const filtersChanged =
      uniqueFilters.length !== currentFilters.length ||
      uniqueFilters.some(
        (filter, index) =>
          filter.targetFieldName !== currentFilters[index]?.targetFieldName
      );

    getBusinesses(1, applyFilter, { filters: uniqueFilters });
  }, [uniqueFilters, loading, searchQuery, location, setFilterData]);

  // effect to update filter component
  useEffect(() => {
    const newFilterData = updateFilter(
      filterData,
      uniqueFilters,
      bizCategories
    );
    setFilterData(newFilterData);
  }, [uniqueFilters]);
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
        newFilterData.stateAndProvince = {
          uuid: filter.values[0],
        };
        break;
      case "city":
        newFilterData.city = {
          uuid: filter.values[0],
        };
        break;
      case "country":
        newFilterData.country = {
          uuid: filter.values[0],
        };
        break;
    }
  });

  return newFilterData;
}
