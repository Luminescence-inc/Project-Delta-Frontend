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
import { Pagination } from "@/components/Pagination";

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

  return (
    <FlexColStart className="w-full h-full">
      <FlexColStart className="w-full px-[20px] mt-10 gap-[15px]">
        <h1 className="text-[30px] font-bold font-inter">Explore Businesses</h1>
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

      {businesses.length > 0 && <Pagination totalPages={totalPages} />}

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
