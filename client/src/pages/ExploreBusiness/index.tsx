import {
  FlexColCenter,
  FlexColStart,
  FlexColStartCenter,
  FlexRowCenterBtw,
  FlexRowStartCenter,
} from "components/Flex";
import "./style.scss";
import SearchIcon from "assets/icons/search-business.svg?react";
import LayoutPanelTop from "../../../public/assets/icons/layout-panel-top.svg?react";
import LayoutPanelLeft from "../../../public/assets/icons/layout-panel-left.svg?react";
import BusinessCardContainer from "./components/BusinessCard";
import BusinessesFilterComponent from "components/BusinessFilter";
import { UserBusinessList } from "types/business";
import { FilterData, useBusinessCtx } from "context/BusinessCtx";
import { IFilter } from "types/business-profile";
import { cn } from "utils";
import { LoaderComponent } from "components/Loader";

const ExploreBusiness = () => {
  const {
    businessCategory,
    businesses,
    getBusinesses,
    currPage,
    allBusinessesLoading,
    totalPages,
    setSearchQuery,
    showFilter,
    setShowFilter,
    layout,
    setLayout,
  } = useBusinessCtx();

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

  return (
    <FlexColStart className="w-full h-full">
      <FlexColStart className="w-full px-[20px] mt-10 gap-[15px]">
        <h1 className="text-[30px] font-bold font-inter">Explore Businesses</h1>
        <p className="text-[15px] font-medium font-inter text-gray-103">
          Discover businesses within and beyond your community
        </p>
      </FlexColStart>
      {/* search component */}
      <FlexRowCenterBtw className="w-full px-[20px] mt-[10px] gap-[20px]">
        <button
          className={cn(
            "w-full px-[15px] py-[12px] rounded-[10px] border-none bg-white-100 disabled:bg-dark-401 disabled:cursor-not-allowed shadow-sm cursor-pointer"
          )}
          onClick={() => setShowFilter(true)}
          disabled={allBusinessesLoading}
        >
          <FlexRowStartCenter className="w-full gap-1">
            <SearchIcon />
            <p className="text-[12px] text-gray-103 font-normal font-inter">
              Search business
            </p>
          </FlexRowStartCenter>
        </button>
        <button
          onClick={() =>
            setLayout && setLayout(layout === "col" ? "row" : "col")
          }
          className="border-none outline-none cursor-pointer rounded-[10px]"
        >
          <FlexColCenter>
            {layout === "col" ? (
              <LayoutPanelTop fill="#130F26" />
            ) : (
              <LayoutPanelLeft fill="#130F26" />
            )}
          </FlexColCenter>
        </button>
      </FlexRowCenterBtw>

      <FlexColCenter className="w-full h-[20px]">
        {allBusinessesLoading && <LoaderComponent />}

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
      <div
        className="ntw w-full flex flex-col items-center justify-center"
        style={{
          height: "100px",
        }}
      >
        {currPage < totalPages && (
          <button
            className={cn(
              "ntw px-20 py-10 rounded-5 border-none outline-none flex items-center justify-center gap-1 loadmore-btn",
              allBusinessesLoading ? "disabled" : ""
            )}
            onClick={() => {
              getBusinesses(currPage + 1, false);
            }}
          >
            {allBusinessesLoading ? (
              <LoaderComponent />
            ) : (
              <span className="ntw text-14 font-normal">Load more</span>
            )}
          </button>
        )}
      </div>

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
