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
import { UserBusinessList } from "@/types/business";
import { FilterData, useBusinessCtx } from "@context/BusinessCtx";
import { IFilter } from "@/types/business-profile";
import { LoaderComponent } from "@components/Loader";
import { useEffect, useState } from "react";
import Input from "@/components/ui/input";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Pagination } from "@/components/Pagination";
import { extractQueryParams, forceReloadClientPage } from "@/utils";
import useTrackPageSearch from "@/hooks/useTrackSearch";
import { prevPageSearchKeyName } from "@/config";
import { useSearchDebounce } from "@/hooks/useSearchDebounce";

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

  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [debouncedSearch, setQuery] = useSearchDebounce(100);
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

  // debounce the search query

  // url search query
  useEffect(() => {
    const search = localStorage.getItem(prevPageSearchKeyName) || "";
    if (search.length > 0) {
      const query = new URLSearchParams(search);
      setUrlSearchQuery(query.get("query") || "");
    }
  }, [prevPageSearch]);

  return (
    <FlexColStart className="w-full h-full">
      <FlexColStart className="w-full px-[20px] mt-10 gap-[15px]">
        <h1 className="text-[20px] md:text-[30px] font-extrabold font-inter">
          {headline.title}
        </h1>
        <p className="text-[15px] font-medium font-inter text-gray-103">
          Discover businesses within and beyond your community
        </p>
      </FlexColStart>
      {/* search component */}
      <FlexRowStartCenter className="w-full px-[20px] mt-8 gap-[5px] bg-none">
        <Input
          inputClassname="font-pp px-0 font-normal border-none tracking-[0]"
          parentClassname="w-full px-4 outline outline-[1px] outline-white-400/20 bg-white-100 cursor-pointer rounded-[10px] border-none"
          type="text"
          placeholder="Search business"
          leftIcon={
            <SearchIcon2
              size={20}
              strokeWidth={1.2}
              className="stroke-gray-103"
            />
          }
          defaultValue={debouncedSearch ? debouncedSearch : urlSearchQuery}
          onChange={(e) =>
            setQuery(
              e.target.value.trim().length > 0 ? e.target.value.trim() : null
            )
          }
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              if (!debouncedSearch) return;
              // @ts-expect-error
              setSearchQuery((prev: ISearch) => ({
                filters: [
                  ...prev.filters.filter(
                    (f: IFilter) => f.targetFieldName !== "query"
                  ),
                  {
                    targetFieldName: "query",
                    values: [debouncedSearch],
                  },
                ],
              }));

              forceReloadClientPage();
            }
          }}
          autoComplete="nope"
        />
        <button
          className="border-none outline-none cursor-pointer rounded-[5px] p-2 flex items-center justify-center bg-blue-50 -translate-y-2"
          onClick={() => setShowFilter(true)}
        >
          <Filter size={15} className="stroke-blue-200" />
        </button>
        <button
          onClick={() =>
            setLayout && setLayout(layout === "col" ? "row" : "col")
          }
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

      <FlexColCenter className="w-full min-h-[20px]">
        {allBusinessesLoading && (
          <div className="mt-5">
            <LoaderComponent />
          </div>
        )}

        {/* not found msg */}
        {!allBusinessesLoading && businesses?.length === 0 && (
          <FlexColStartCenter className="w-full mt-[35px]">
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

      {businesses?.length > 0 && !allBusinessesLoading && (
        <Pagination totalPages={totalPages} />
      )}

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
