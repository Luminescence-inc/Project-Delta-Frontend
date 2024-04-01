import {
  FlexColCenter,
  FlexColStart,
  FlexColStartCenter,
  FlexRowCenterBtw,
  FlexRowStart,
  FlexRowStartBtw,
  FlexRowStartCenter,
} from "components/Flex";
import React, { useEffect, useState } from "react";
import "./style.scss";
import {
  HeartIcon,
  LoaderCircle,
} from "lucide-react";
import SearchIcon from 'assets/icons/Search-business.svg?react';
import LayoutPanelTop from 'assets/icons/layout-panel-top.svg?react';
import LayoutPanelLeft from 'assets/icons/layout-panel-left.svg?react';
import BusinessCardContainer from "./components/BusinessCard";
import BusinessesFilterComponent from "components/BusinessFilter";
import { allBusinessCategories, getListOfBusinsessProfile } from "api/business";
import { BusinessCategories, IOption } from "types/business";
import { FilterData } from "context/BusinessCtx";
import { IFilter, ISearch } from "types/business-profile";
import { cn, sleep } from "utils";

type IBusinessProfile = {};

export default function ExploreBusiness() {
  const [layout, setLayout] = useState<"row" | "col">("col");
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [businessCategory, setBusinessCategory] = useState<IOption[]>();
  const [currPage, setCurrPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<ISearch | null>(null);
  const [businesses, setBusinesses] = useState<IBusinessProfile[] | []>([]);

  useEffect(() => {
    try {
      allBusinessCategories().then((res) => {
        const resData: BusinessCategories = res.data;
        setBusinessCategory(
          resData.data.businessCategories.map((businessCat) => {
            return { uuid: businessCat.uuid, value: businessCat.description };
          })
        );
      });
    } catch (err) {}
  }, []);

  // fetch all businesses initially with or without a filter
  useEffect(() => {
    getBusinesses(1, searchQuery ? true : false);
  }, [searchQuery]);

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

  async function getBusinesses(currPage: number, filterApplied: boolean) {
    setLoading(true);
    const result = await getListOfBusinsessProfile(
      {
        page: currPage,
        sortBy: "createdUtc",
        sortDirection: "asc",
        limit: 10,
      },
      searchQuery
    );
    const data = result.data?.data.businessProfiles;

    await sleep(1);
    setLoading(false);

    // remove any duplicates
    if (!filterApplied) {
      const comb = [...businesses, ...data?.data];
      const unique = comb.filter(
        (v, i, a) => a.findIndex((t) => t.uuid === v.uuid) === i
      );
      setBusinesses(unique);
    } else {
      setBusinesses(data.data);
    }

    setTotalPages(data?.totalPages || 1);
    setCurrPage(currPage);
  }

  return (
    <div className="ntw w-full h-full">
      <FlexColStart className="w-full px-30 mt-10">
        <h1 className="ntw text-30 font-bold">Explore Businesses</h1>
        <p
          className="ntw text-15 font-medium"
          style={{
            color: "#9090A7",
          }}
        >
          Discover businesses within and beyond your community
        </p>
      </FlexColStart>
      {/* search component */}
      <FlexRowCenterBtw className="w-full px-20 mt-10">
        <button
          className={cn(
            "ntw w-full px-15 py-15 rounded-10 border-none font-helvetical filter-trigger",
            loading ? "disabled" : "cursor-pointer bg-white"
          )}
          onClick={() => setShowFilter(true)}
          disabled={loading}
        >
          <FlexRowStartCenter className="w-full">
            <SearchIcon />
            <p className="ntw text-12 font-normal" style={{ color: "#9090A7" }}>
              Search business
            </p>
          </FlexRowStartCenter>
        </button>
        <button
          onClick={() => setLayout(layout === "col" ? "row" : "col")}
          className="ntw border-none outline-none cursor-pointer"
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
        {loading && <LoaderCircle size={15} className="loader" />}

        {/* not found msg */}
        {!loading && businesses.length === 0 && (
          <FlexColStartCenter className="w-full">
            <p className="ntw text-15 font-normal" style={{ color: "#9090A7" }}>
              No business found
            </p>
          </FlexColStartCenter>
        )}
      </div>

      {/* business card lists */}
      <BusinessCardContainer
        layout={layout}
        data={businesses as any}
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
              loading ? "disabled" : ""
            )}
            onClick={() => {
              getBusinesses(currPage + 1, false);
            }}
          >
            {loading ? (
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
}
