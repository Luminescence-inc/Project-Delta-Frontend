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
import { cn } from "@/utils";
import { LoaderComponent } from "@components/Loader";
import { useEffect, useState } from "react";
import Input from "@/components/ui/Input";


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
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

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
    const response = {
      title: "",
      busicnesses: "",
    };

    const top10_businesses_name = businesses
      .map((b) => b.name)
      .slice(0, 10)
      .join(" - ");

    response["busicnesses"] = top10_businesses_name;

    if (city && state) {
      response["title"] = `TOP 10 Businesses Near ${city}, ${state}`;
      return response;
    }
    if (country && state) {
      response["title"] = `TOP 10 Businesses Near ${state}, ${country}`;
      return response;
    }
    if (country) {
      response["title"] = `TOP 10 Businesses in ${country}`;
      return response;
    }
    if (state) {
      response["title"] = `TOP 10 Businesses Near ${state}`;
      return response;
    }
    if (city) {
      response["title"] = `TOP 10 Businesses Near ${city}`;
      return response;
    }
    response["title"] = "Explore Businesses Near You";
    return response;
  };

  const date = dayjs().format("MMM DD YYYY");
  const metaDescription = `${generateHeadlineText().title}, - ${date} - ${
    generateHeadlineText().busicnesses
  }`;

  return (
    <FlexColStart className="w-full h-full">
      <MetaTagsProvider
        title={generateHeadlineText().title}
        description={metaDescription}
        url={window.location.href}
        og={{
          title: generateHeadlineText().title,
          description: metaDescription,
          url: window.location.href,
        }}
      />

      <FlexColStart className="w-full px-[20px] mt-10 gap-[15px]">
        <h1 className="text-[20px] md:text-[30px] font-extrabold font-inter">
          {generateHeadlineText().title}
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
          onChange={(e) => setSearch(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              setSearchQuery({
                filters: [
                  {
                    targetFieldName: "query",
                    values: [search],
                  },
                ],
              });
            }
          }}
          autoComplete="off"
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
