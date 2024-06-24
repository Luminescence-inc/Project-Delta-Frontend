import {
  FlexColCenter,
  FlexColStart,
  FlexColStartCenter,
  FlexRowStartCenter,
} from "@components/Flex";
import { Filter, SearchIcon2 } from "@components/icons";
import BusinessCardContainer from "./components/BusinessCard";
import BusinessesFilterComponent from "@components/BusinessFilter";
import { UserBusinessList } from "@/types/business";
import { FilterData, useBusinessCtx } from "@context/BusinessCtx";
import { IFilter } from "@/types/business-profile";
import { LoaderComponent } from "@components/Loader";
import { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Pagination } from "@/components/Pagination";
import MetaTagsProvider from "@/provider/MetaTagsProvider";
import { extractQueryParams } from "@/utils";

dayjs.extend(relativeTime);

const ExploreBusiness = () => {
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
  const [search, setSearch] = useState<string>("");
  const [headline, setHeadline] = useState({
    title: "",
    businesses: "",
  });

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
  };

  // ! Might be useful later
  useEffect(() => {
    if (searchQuery) {
      setShowFilter(false);
    }
  }, [searchQuery]);

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
    if (allBusinessesLoading) return;
    const { country, state, city, query } = generateHeadlineFromQuery();

    if (businesses && businesses.length === 0) {
      const locHeadline = (country: string, state: string, city: string) => {
        if (country && state) {
          return `Near '${city}, ${state}'`;
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
      .map((b) => b.name)
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
  useEffect(() => {
    if (search.length < 1 || !search) {
      // remove the query filter
      // @ts-expect-error
      setSearchQuery((prev: ISearch) => ({
        filters: prev?.filters?.filter(
          (f: IFilter) => f.targetFieldName !== "query"
        ),
      }));
      return;
    }
    const debouncedSearch = debounceSearch((value: string) => {
      // @ts-expect-error
      setSearchQuery((prev: ISearch) => ({
        filters: [
          ...prev.filters.filter((f: IFilter) => f.targetFieldName !== "query"),
          {
            targetFieldName: "query",
            values: [value],
          },
        ],
      }));
    }, 500);

    debouncedSearch(search);
  }, [search]);

  const debounceSearch = (fn: Function, delay: number) => {
    let timer: any;
    return function (...args: any) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const date = dayjs().format("MMM DD YYYY");
  const metaDescription = `${headline.title}, - ${date} - ${headline.businesses}`;

  return (
    <FlexColStart className="w-full h-full">
      <MetaTagsProvider
        title={headline.title}
        description={metaDescription}
        url={window.location.href}
        og={{
          title: headline.title,
          description: metaDescription,
          url: window.location.href,
        }}
      />

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
          inputClassname="font-inter font-normal border-none tracking-[0]"
          parentClassname="w-full outline outline-[1px] outline-white-400/20 bg-white-100 cursor-pointer rounded-[10px]"
          type="text"
          placeholder="Search business"
          leftIcon={
            <SearchIcon2
              size={20}
              strokeWidth={1.2}
              className="stroke-gray-103"
            />
          }
          onChange={(e) => setSearch(e.target.value.replace(/\s/g, ""))}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              if (search.length === 0 || !search) return;
              // @ts-expect-error
              setSearchQuery((prev: ISearch) => ({
                filters: [
                  ...prev.filters.filter(
                    (f: IFilter) => f.targetFieldName !== "query"
                  ),
                  {
                    targetFieldName: "query",
                    values: [search],
                  },
                ],
              }));
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
        {!allBusinessesLoading && businesses.length === 0 && (
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

      {businesses.length > 0 && !allBusinessesLoading && (
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
};
export default ExploreBusiness;
