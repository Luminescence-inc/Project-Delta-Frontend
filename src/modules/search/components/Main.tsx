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
import { type IFilter } from "@/types/business-profile";
import { LoaderComponent } from "@components/Loader";
import { useCallback, useEffect, useState } from "react";
import Input from "@/components/ui/input";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { extractQueryParams, forceReloadClientPage } from "@/utils";
import useTrackPageSearch from "@/hooks/useTrackSearch";
import { prevPageSearchKeyName } from "@/config";
import { useDataCtx } from "@/context/DataCtx";
import { useRouter } from "next/navigation";

dayjs.extend(relativeTime);

export default function MainSearchPageComponent() {
  const {
    businessCategory,
    businesses,
    allBusinessesLoading,
    totalPages,
    setSearchQuery,
    layout,
    setLayout,
    searchQuery,
  } = useBusinessCtx();
  const { setNavbarBgColor } = useDataCtx();
  const router = useRouter();
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [query, setQuery] = useState<string | null>(null);
  const [urlSearchQuery, setUrlSearchQuery] = useState<string>("");
  const [headline, setHeadline] = useState({
    title: "",
    businesses: "",
  });

  // track the page location search query
  const prevPageSearch = useTrackPageSearch();

  // construct the search query
  const constructQuery = (filterData: FilterData) => {
    const query: IFilter[] = [];
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
          query.push({
            targetFieldName: key,
            values: queryValues,
          });
        }
      }
    }
    setSearchQuery({
      filters: query,
    });

    forceReloadClientPage();
  };

  const generateHeadlineFromQuery = () => {
    let state = null,
      country = null,
      city = null,
      query = null;
    const { filters } = extractQueryParams();
    country = filters.find((it) => it.targetFieldName === "country");
    state = filters.find((it) => it.targetFieldName === "stateAndProvince");
    city = filters.find((it) => it.targetFieldName === "city");
    query = filters.find((it) => it.targetFieldName === "query");

    return {
      country: country?.values[0],
      state: state?.values[0],
      city: city?.values[0],
      query: query?.values[0],
    };
  };

  useEffect(() => {
    if (searchQuery) {
      setShowFilter(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (allBusinessesLoading) return;
    const { country, state, city, query } = generateHeadlineFromQuery();

    if (businesses && businesses.length === 0) {
      const locHeadline = (country: string, state: string, city: string) => {
        if (country && state) {
          return `Near '${country}, ${state}'`;
        } else if (state && country) {
          return `Near '${state}, ${country}'`;
        } else if (city) {
          return `Near '${city}'`;
        } else if (state) {
          return `Near '${state}'`;
        } else if (country) {
          return `In '${country}'`;
        }
      };

      setHeadline({
        title: `No result for${
          query ? " '" + query + "'" : " businesses"
        } ${locHeadline(country!, state!, city!)}`,
        businesses: "",
      });
      return;
    }

    const top10BusinessesName = businesses
      ?.map((b) => b.name)
      .slice(0, 10)
      .join(" - ");

    let title = `Explore ${query ? `"${query}" Businesses` : "Businesses"}`;

    if (city && state) {
      title += ` Near ${city}, ${state}`;
    } else if (state && country) {
      title += ` Near ${state}, ${country}`;
    } else if (city) {
      title += ` Near ${city}`;
    } else if (state) {
      title += ` Near ${state}`;
    } else if (country) {
      title += ` in ${country}`;
    } else {
      title = `Explore ${
        query ? `"${query}" Businesses` : "Businesses"
      } Near You`;
    }

    setHeadline({
      title,
      businesses: top10BusinessesName,
    });
  }, [businesses, allBusinessesLoading]);

  useEffect(() => {
    const search = localStorage.getItem(prevPageSearchKeyName) || "";
    if (search.length > 0) {
      const query = new URLSearchParams(search);
      setUrlSearchQuery(query.get("query") || "");
    }
  }, [prevPageSearch]);

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
        {allBusinessesLoading && (
          <div className="mt-5">
            <LoaderComponent />
          </div>
        )}

        {/* not found msg */}
        {!allBusinessesLoading && businesses?.length === 0 && (
          <FlexColStartCenter className="w-full">
            <p className="text-[15px] font-semibold font-inter text-gray-103">
              No business found. Please modify your search
            </p>
          </FlexColStartCenter>
        )}
      </FlexColCenter>

      {/* business card lists */}
      {!allBusinessesLoading && (
        <BusinessCardContainer
          data={businesses as UserBusinessList[]}
          businessCategories={businessCategory}
        />
      )}

      {/* {businesses?.length > 0 && !allBusinessesLoading && (
        <Pagination totalPages={totalPages} />
      )} */}

      {/* Filtering component */}
      <BusinessesFilterComponent
        closeFilter={() => setShowFilter(false)}
        getfilterData={(filter) => constructQuery(filter)}
        businessesCategories={businessCategory}
        showFilter={showFilter}
      />
    </FlexColStart>
  );
}
