import {
  FlexColCenter,
  FlexColStart,
  FlexColStartCenter,
  FlexRowCenterBtw,
  FlexRowStartCenter,
} from "@components/Flex";
import { SearchIcon2 } from "@components/icons";
import BusinessCardContainer from "./components/BusinessCard";
import BusinessesFilterComponent from "@components/BusinessFilter";
import { UserBusinessList } from "@/types/business";
import { FilterData, useBusinessCtx } from "@context/BusinessCtx";
import { IFilter } from "@/types/business-profile";
import { cn } from "@/utils";
import { LoaderComponent } from "@components/Loader";
import { useEffect, useState } from "react";
import MetaTagsProvider from "@/provider/MetaTagsProvider";

const ExploreBusiness = () => {
  const {
    businessCategory,
    businesses,
    getBusinesses,
    currPage,
    allBusinessesLoading,
    totalPages,
    setSearchQuery,
    layout,
    setLayout,
    searchQuery,
  } = useBusinessCtx();
  const [showFilter, setShowFilter] = useState<boolean>(true);

  // construct the search query
  const constructQuery = (filterData: FilterData) => {
    const query: IFilter[] = [];
    for (let key in filterData) {
      // @ts-expect-error
      const val = filterData[key];
      if (val) {
        const queryValues = Array.isArray(val)
          ? val.map((it) => it.uuid)
          : [val.uuid];
        query.push({
          targetFieldName: key,
          values: queryValues,
        });
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
      city = null;
    if (!searchQuery) {
      return {
        country,
        state,
        city,
      };
    }
    country = searchQuery?.filters.find(
      (it) => it.targetFieldName === "country"
    );
    state = searchQuery?.filters.find(
      (it) => it.targetFieldName === "stateAndProvince"
    );
    city = searchQuery?.filters.find((it) => it.targetFieldName === "city");

    return {
      country: country?.values[0],
      state: state?.values[0],
      city: city?.values[0],
    };
  };

  const generateHeadlineText = () => {
    const { country, state, city } = generateHeadlineFromQuery();
    if (city && state) {
      return `TOP 10 Businesses Near ${city}, ${state}`;
    }
    if (country && state) {
      return `TOP 10 Businesses Near ${state}, ${country}`;
    }
    if (country) {
      return `TOP 10 Businesses in ${country}`;
    }
    if (state) {
      return `TOP 10 Businesses Near ${state}`;
    }
    if (city) {
      return `TOP 10 Businesses Near ${city}`;
    }
    return "Explore Businesses Near You";
  };

  return (
    <FlexColStart className="w-full h-full">
      <MetaTagsProvider
        title={generateHeadlineText()}
        description={generateHeadlineText()}
        og={{
          title: generateHeadlineText(),
          description: generateHeadlineText(),
        }}
      />

      <FlexColStart className="w-full px-[20px] mt-10 gap-[15px]">
        <h1 className="text-[20px] md:text-[30px] font-extrabold font-inter">
          {generateHeadlineText()}
        </h1>
        <p className="text-[15px] font-medium font-inter text-gray-103">
          Discover businesses within and beyond your community
        </p>
      </FlexColStart>
      {/* search component */}
      <FlexRowCenterBtw className="w-full px-[20px] mt-[10px] gap-[20px] bg-none">
        <button
          className={cn(
            "w-full px-[15px] py-[12px] rounded-[10px] border-none outline-none bg-white-100 disabled:bg-white-106 disabled:cursor-not-allowed shadow-sm cursor-pointer"
          )}
          onClick={() => setShowFilter(true)}
          disabled={allBusinessesLoading}
        >
          <FlexRowStartCenter className="w-full gap-1">
            <SearchIcon2
              size={20}
              strokeWidth={1.2}
              className="stroke-gray-103"
            />
            <p className="text-[12px] relative left-1 top-[1px] text-gray-103 font-normal font-inter">
              Search business
            </p>
          </FlexRowStartCenter>
        </button>
        <button
          onClick={() =>
            setLayout && setLayout(layout === "col" ? "row" : "col")
          }
          className="border-none outline-none cursor-pointer rounded-[10px] p-2 flex items-center justify-center"
        >
          <FlexColCenter>
            {layout === "col" ? (
              <img src={"/assets/icons/layout-panel-top.svg"} />
            ) : (
              <img src={"/assets/icons/layout-panel-left.svg"} />
            )}
          </FlexColCenter>
        </button>
      </FlexRowCenterBtw>

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
      <BusinessCardContainer
        data={businesses as UserBusinessList[]}
        businessCategories={businessCategory}
      />

      {/* Load more button */}
      <FlexColCenter
        className="w-full h-[100px] mt-4"
        style={{
          height: "100px",
        }}
      >
        {currPage < totalPages && businesses.length > 0 && (
          <button
            className={cn(
              "px-[20px] py-[10px] rounded-5 border-none outline-none flex items-center justify-center gap-[1px] cursor-pointer bg-white-105 transition-all",
              allBusinessesLoading ? "bg-white-106 cursor-not-allowed" : ""
            )}
            onClick={() => {
              if (!allBusinessesLoading) {
                getBusinesses(currPage + 1, false);
              }
            }}
          >
            {allBusinessesLoading ? (
              <LoaderComponent />
            ) : (
              <span className="text-[14px] font-normal font-inter text-dark-100">
                Load more
              </span>
            )}
          </button>
        )}
      </FlexColCenter>

      {/* Filtering component */}
      {showFilter && (
        <BusinessesFilterComponent
          closeFilter={() => setShowFilter(false)}
          getfilterData={(filter) => constructQuery(filter)}
          businessesCategories={businessCategory}
        />
      )}
    </FlexColStart>
  );
};
export default ExploreBusiness;
