"use client";
import {
  FlexColCenter,
  FlexColStart,
  FlexColStartCenter,
  FlexRowStartCenter,
} from "@components/Flex";
import { Filter, SearchIcon2 } from "@components/icons";
import BusinessCardContainer from "@/modules/search/components/BusinessCard";
import BusinessesFilterComponent from "@components/BusinessFilter";
import { UserBusinessList, type IOption } from "@/types/business";
import { FilterData, useBusinessCtx } from "@context/BusinessCtx";
import {
  type IBusinessProfile,
  type IFilter,
  type INFilters,
} from "@/types/business-profile";
import { LoaderComponent } from "@components/Loader";
import { useCallback, useEffect, useState } from "react";
import Input from "@/components/ui/input";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  constructNSearchUrl,
  extractQueryParams,
  forceReloadClientPage,
  overrideQueryParameters,
} from "@/utils";
import useTrackPageSearch from "@/hooks/useTrackSearch";
import { DEFAULT_COUNTRY, prevPageSearchKeyName } from "@/config";
import { useDataCtx } from "@/context/DataCtx";
import { useRouter } from "next/navigation";
import NBusinessFilter from "@/components/NewFilterComponent/NBusinessFilter";
import { useLocation } from "@/hooks/useLocation";
import countryHelpers from "@/helpers/countries-states-city/country";
import { useMutation } from "@tanstack/react-query";
import { searchForBusinesses } from "@/api/business";
import { toast } from "react-toastify";
import { Pagination } from "@/components/Pagination";

dayjs.extend(relativeTime);

interface BusinessesData {
  data: IBusinessProfile[];
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}

export default function MainSearchPageComponent() {
  const {
    businessCategory,
    allBusinessesLoading,
    totalPages,
    setSearchQuery,
    layout,
    setLayout,
    searchQuery,
  } = useBusinessCtx();
  const { setNavbarBgColor } = useDataCtx();
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [businesses, setBusinesses] = useState<BusinessesData>({
    data: [],
    limit: 0,
    page: 0,
    total: 0,
    totalPages: 0,
  });
  const router = useRouter();
  const { loading, location } = useLocation();
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [query, setQuery] = useState<string | null>(null);
  const [urlSearchQuery, setUrlSearchQuery] = useState<string>("");
  const [nFilters, setNFilters] = useState<INFilters>({
    category: null,
    country: null,
    stateAndProvince: null,
    city: null,
    pagination: {
      page: 1,
      limit: 10,
    },
  });
  const [headline, setHeadline] = useState({
    title: "",
    businesses: "",
  });
  const getBusinessesMut = useMutation({
    mutationFn: async (param: string) => await searchForBusinesses(param),
    onSuccess: (res) => {
      const resp = res?.data?.businessProfiles as BusinessesData;
      setBusinesses(resp);
      setPageLoading(false);
    },
    onError: (error) => {
      const err = (error as any).response.data;
      // setError(err.message);
      setPageLoading(false);
      toast.error(err.message);
    },
  });

  // track the page location search query
  const prevPageSearch = useTrackPageSearch();

  // construct the search query
  const constructQuery = (filterData: INFilters) => {
    const params = new URLSearchParams(window.location.search);
    for (let key in filterData) {
      // @ts-expect-error
      const val = filterData[key];
      if (val) {
        const isCategory = key === "businessCategoryUuid";
        const queryValues = Array.isArray(val)
          ? val.map((it) => (isCategory ? it.value : it.uuid))
          : [isCategory ? val.value : val.uuid];

        // make sure the value isn't undefined
        if (queryValues[0]) {
          params.set(
            key === "category" ? "cat" : key,
            encodeURIComponent(queryValues[0])
          );
        }
      }
    }
    forceReloadClientPage();
  };

  const extractFilterFromQueryParam = useCallback(() => {
    const { filters } = extractQueryParams();
    const paginationKeys = ["page", "limit"];
    filters.forEach((f) => {
      if (paginationKeys.includes(f.targetFieldName)) {
        setNFilters((p) => ({
          ...p,
          pagination: {
            ...p.pagination,
            [f.targetFieldName]: parseInt(f.values[0]),
          },
        }));
      } else {
        setNFilters((p) => ({
          ...p,
          [f.targetFieldName === "businessCategoryUuid"
            ? "category"
            : f.targetFieldName]: decodeURIComponent(f.values[0]),
        }));
      }
    });
  }, []);

  const handleLocationBaseFilterOnMount = useCallback(async () => {
    if (!loading && location) {
      const isoCode = location.countryCode;
      const { filters } = extractQueryParams();
      const isCountrySupported = countryHelpers.isCountrySupportedByIsoCode(
        isoCode!
      );
      if (!isCountrySupported) {
        nFilters.country = DEFAULT_COUNTRY;
      } else {
        const countryExists = filters.find(
          (f) => f.targetFieldName === "country"
        );
        if (!countryExists) {
          nFilters.country = location.country!;
          nFilters.stateAndProvince = location.state!;
          nFilters.city = location.city!;
        }
      }
      setNFilters(nFilters);
      overrideQueryParameters({
        cn: nFilters.country!,
        st: nFilters.stateAndProvince!,
        ct: nFilters.city!,
      });

      if (businesses?.data.length === 0) {
        const nSearchParam = constructNSearchUrl(nFilters);
        getBusinessesMut.mutate(nSearchParam);
      }
    }
  }, [loading, location]);

  useEffect(() => {
    extractFilterFromQueryParam();
    handleLocationBaseFilterOnMount();
  }, [extractFilterFromQueryParam, handleLocationBaseFilterOnMount]);

  // const generateHeadlineFromQuery = () => {
  //   let state = null,
  //     country = null,
  //     city = null,
  //     query = null;
  //   const { filters } = extractQueryParams();
  //   country = filters.find((it) => it.targetFieldName === "country");
  //   state = filters.find((it) => it.targetFieldName === "stateAndProvince");
  //   city = filters.find((it) => it.targetFieldName === "city");
  //   query = filters.find((it) => it.targetFieldName === "query");

  //   return {
  //     country: country?.values[0],
  //     state: state?.values[0],
  //     city: city?.values[0],
  //     query: query?.values[0],
  //   };
  // };

  // useEffect(() => {
  //   if (searchQuery) {
  //     setShowFilter(false);
  //   }
  // }, [searchQuery]);

  // useEffect(() => {
  //   if (allBusinessesLoading) return;
  //   const { country, state, city, query } = generateHeadlineFromQuery();

  //   if (businesses && businesses.length === 0) {
  //     const locHeadline = (country: string, state: string, city: string) => {
  //       if (country && state) {
  //         return `Near '${country}, ${state}'`;
  //       } else if (state && country) {
  //         return `Near '${state}, ${country}'`;
  //       } else if (city) {
  //         return `Near '${city}'`;
  //       } else if (state) {
  //         return `Near '${state}'`;
  //       } else if (country) {
  //         return `In '${country}'`;
  //       }
  //     };

  //     setHeadline({
  //       title: `No result for${
  //         query ? " '" + query + "'" : " businesses"
  //       } ${locHeadline(country!, state!, city!)}`,
  //       businesses: "",
  //     });
  //     return;
  //   }

  //   const top10BusinessesName = businesses
  //     ?.map((b) => b.name)
  //     .slice(0, 10)
  //     .join(" - ");

  //   let title = `Explore ${query ? `"${query}" Businesses` : "Businesses"}`;

  //   if (city && state) {
  //     title += ` Near ${city}, ${state}`;
  //   } else if (state && country) {
  //     title += ` Near ${state}, ${country}`;
  //   } else if (city) {
  //     title += ` Near ${city}`;
  //   } else if (state) {
  //     title += ` Near ${state}`;
  //   } else if (country) {
  //     title += ` in ${country}`;
  //   } else {
  //     title = `Explore ${
  //       query ? `"${query}" Businesses` : "Businesses"
  //     } Near You`;
  //   }

  //   setHeadline({
  //     title,
  //     businesses: top10BusinessesName,
  //   });
  // }, [businesses, allBusinessesLoading]);

  // useEffect(() => {
  //   const search = localStorage.getItem(prevPageSearchKeyName) || "";
  //   if (search.length > 0) {
  //     const query = new URLSearchParams(search);
  //     setUrlSearchQuery(query.get("query") || "");
  //   }
  // }, [prevPageSearch]);

  useEffect(() => {
    const searchParam = new URLSearchParams(window.location.search);
    const _query = searchParam.get("query");

    if (_query && !query) setQuery(_query);

    setNavbarBgColor({
      child: "#fff",
    });
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value.trim();
      setQuery(value.length > 0 ? value : null);
    },
    []
  );

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value.trim();

      if (value.length === 0) {
        setQuery(null);
      }

      if (event.key === "Enter") {
        const params = new URLSearchParams(window.location.search);

        if (!query && params.get("query") !== null) {
          params.delete("query");
          updateURLAndSearch(params);
          updateSearch("query", null, "query", true);
        } else {
          const page = params.get("page");
          if (page && parseInt(page) > 1) {
            params.delete("page");
            params.set("query", query!);
            updateURLAndSearch(params);
            updateSearch("query", query, "page", true);
          } else {
            params.set("query", query!);
            updateURLAndSearch(params);
            updateSearch("query", query, null, true);
          }
        }
      }
    },
    [query, router]
  );

  const updateURLAndSearch = useCallback((params: URLSearchParams) => {
    // this is consider faster than router.push
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  }, []);

  const updateSearch = useCallback(
    (
      fieldName: string | null,
      value: string | null,
      removedFieldName?: string | null,
      timeout?: boolean
    ) => {
      // @ts-expect-error
      setSearchQuery((prev) => ({
        filters: [
          ...(removedFieldName
            ? [
                prev.filters.filter(
                  (f: IFilter) => f.targetFieldName !== removedFieldName
                ),
              ]
            : [prev.filters.filter]),
          ...(value ? [{ targetFieldName: fieldName, values: [value] }] : []),
        ],
      }));

      if (timeout) {
        setTimeout(() => {
          forceReloadClientPage();
        }, 500);
      } else {
        forceReloadClientPage();
      }
    },
    []
  );

  console.log({ nFilters });

  return (
    <FlexColStart className="w-full h-full bg-blue-204 pb-[2em]">
      <FlexColStart className="w-full h-auto px-[20px] mt-3 gap-[5px]">
        <h1 className="text-[25px] md:text-[30px] font-bold font-pp text-blue-200">
          {headline.title}
        </h1>
        <p className="text-[15px] font-medium font-pp leading-[23px] text-gray-103">
          Discover businesses within and beyond your community
        </p>
      </FlexColStart>
      {/* search component */}
      <FlexRowStartCenter className="w-full px-[20px] gap-[5px] bg-transparent">
        <Input
          inputClassname="font-pp px-0 font-normal border-none tracking-[0] placeholder:text-gray-103"
          parentClassname="w-full h-[44px] px-4 bg-white-100 cursor-pointer rounded-[10px] border-none"
          type="text"
          placeholder="Search business"
          leftIcon={
            <SearchIcon2
              size={20}
              strokeWidth={1.2}
              className="stroke-gray-103"
            />
          }
          defaultValue={query ? query : urlSearchQuery}
          onChange={handleInputChange}
          onKeyUp={handleKeyUp}
          autoComplete="off"
        />
        <button
          className="border-none outline-none cursor-pointer rounded-[5px] p-2 flex items-center justify-center bg-blue-50 -translate-y-2"
          onClick={() => setShowFilter(true)}
        >
          <Filter size={15} className="stroke-blue-200" />
        </button>
        <button
          onClick={() => {
            const search = new URLSearchParams(window.location.search);
            const layout = search.get("layout");
            const newLayout = !layout
              ? "row"
              : layout === "col"
              ? "row"
              : "col";
            search.set("layout", newLayout);
            setLayout && setLayout(newLayout);
            router.push(`${window.location.pathname}?${search.toString()}`);
          }}
          className="border-none outline-none cursor-pointer rounded-[10px] p-2 flex items-center justify-center -translate-y-2"
        >
          <FlexColCenter>
            {layout === "col" ? (
              <img src={"/assets/icons/layout-panel-top.svg"} />
            ) : (
              <img src={"/assets/icons/layout-panel-left.svg"} />
            )}
          </FlexColCenter>
        </button>
      </FlexRowStartCenter>

      <FlexColCenter className="w-full">
        {(pageLoading || getBusinessesMut.isPending) && (
          <div className="mt-5">
            <LoaderComponent />
          </div>
        )}

        {/* not found msg */}
        {(!pageLoading || !getBusinessesMut.isPending) &&
          businesses?.data?.length === 0 && (
            <FlexColStartCenter className="w-full">
              <p className="text-[15px] font-semibold font-inter text-gray-103">
                No business found. Please modify your search
              </p>
            </FlexColStartCenter>
          )}
      </FlexColCenter>

      <NBusinessFilter
        opened={showFilter}
        nFilters={nFilters}
        setNFilters={setNFilters}
        onClose={() => setShowFilter(false)}
        onApplyFilters={() => {
          const nSearchParam = constructNSearchUrl(nFilters);
          getBusinessesMut.mutate(nSearchParam);
          setShowFilter(false);
        }}
      />

      {/* business card lists */}
      {/* {!allBusinessesLoading && (
        <BusinessCardContainer
          data={businesses as UserBusinessList[]}
          businessCategories={businessCategory}
        />
      )} */}

      {businesses?.data?.length > 0 &&
        !pageLoading &&
        !getBusinessesMut.isPending && (
          <Pagination
            totalPages={businesses.totalPages}
            urlSearchParam={new URLSearchParams(window.location.search)}
            activePage={String(businesses.page)}
            location={window.location}
            SSR={true}
          />
        )}

      {/* Filtering component */}
      {/* <BusinessesFilterComponent
        closeFilter={() => setShowFilter(false)}
        getfilterData={(filter) => constructQuery(filter)}
        businessesCategories={businessCategory}
        showFilter={showFilter}
      /> */}
    </FlexColStart>
  );
}
