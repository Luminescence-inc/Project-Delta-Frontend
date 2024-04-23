import {
  FlexColCenter,
  FlexColStart,
  FlexColStartCenter,
  FlexRowCenterBtw,
  FlexRowStartCenter,
} from "components/Flex";
import "./style.scss";
import { LoaderCircle } from "lucide-react";
import SearchIcon from "assets/icons/search-business.svg?react";
import LayoutPanelTop from "assets/icons/layout-panel-top.svg?react";
import LayoutPanelLeft from "assets/icons/layout-panel-left.svg?react";
import BusinessCardContainer from "./components/BusinessCard";
import BusinessesFilterComponent from "components/BusinessFilter";
import { UserBusinessList } from "types/business";
import { FilterData, useBusinessCtx } from "context/BusinessCtx";
import { IFilter } from "types/business-profile";
import { cn } from "utils";
import { useEffect, useState } from "react";

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
  // useEffect(() => {
  //   if (searchQuery) {
  //     setShowFilter(false);
  //   }
  // }, [searchQuery]);

  return (
    <div className="ntw w-full h-full">
      <FlexColStart className="w-full px-20 mt-10 gap-15">
        <h1 className="ntw text-30 font-bold font-hn-bold">
          Explore Businesses
        </h1>
        <p
          className="ntw text-15 font-medium font-hn-medium"
          style={{
            color: "#9090A7",
          }}
        >
          Discover businesses within and beyond your community
        </p>
      </FlexColStart>
      {/* search component */}
      <FlexRowCenterBtw className="w-full px-20 mt-5 gap-20 mt-10">
        <button
          className={cn(
            "ntw w-full px-15 py-15 rounded-10 border-none font-helvetical filter-trigger",
            allBusinessesLoading ? "disabled" : "cursor-pointer bg-white"
          )}
          onClick={() => setShowFilter(true)}
          disabled={allBusinessesLoading}
        >
          <FlexRowStartCenter className="w-full">
            <SearchIcon />
            <p className="ntw text-12 font-normal" style={{ color: "#9090A7" }}>
              Search business
            </p>
          </FlexRowStartCenter>
        </button>
        <button
          onClick={() =>
            setLayout && setLayout(layout === "col" ? "row" : "col")
          }
          className="ntw border-none outline-none cursor-pointer rounded-10"
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

      <div
        className="ntw w-full flex flex-col items-center justify-center"
        style={{
          height: "20px",
        }}
      >
        {allBusinessesLoading && <LoaderCircle size={15} className="loader" />}

        {/* not found msg */}
        {!allBusinessesLoading && businesses.length === 0 && (
          <FlexColStartCenter className="w-full mt-35">
            <p
              className="ntw text-15 font-bold font-hn-light"
              style={{ color: "#9090A7" }}
            >
              No business found. Please modify your search
            </p>
          </FlexColStartCenter>
        )}
      </div>

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
              <LoaderCircle size={15} className="loader" />
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
    </div>
  );
};
export default ExploreBusiness;
