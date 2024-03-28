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
import { LayoutPanelLeft, LayoutPanelTop, SearchIcon } from "lucide-react";
import BusinessCardContainer from "./components/BusinessCard";
import BusinessesFilterComponent from "components/BusinessFilter";
import { allBusinessCategories } from "api/business";
import { BusinessCategories, IOption } from "types/business";

type IBusinessProfile = {};

export default function ExploreBusiness() {
  const [layout, setLayout] = useState<"row" | "col">("col");
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [businessCategory, setBusinessCategory] = useState<IOption[]>();
  const [businesses, setBusinesses] = useState<
    IBusinessProfile[] | undefined | null
  >(null);

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
    // fetch businesses
  }, []);

  return (
    <div className="ntw w-full h-full">
      <FlexColStart className="w-full px-30 mt-20">
        <h1 className="text-30">Explore Businesses</h1>
        <p
          className="text-1 font-light"
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
          className="ntw w-full bg-white px-15 py-15 rounded-10 border-none cursor-pointer font-helvetical"
          onClick={() => setShowFilter(true)}
        >
          <FlexRowStartCenter className="w-full">
            <SearchIcon size={20} color="#9090A7" />
            <p className="ntw text-15" style={{ color: "#9090A7" }}>
              Search business
            </p>
          </FlexRowStartCenter>
        </button>
        <button
          onClick={() => setLayout(layout === "col" ? "row" : "col")}
          className="ntw border-none outline-none layout-switch p-10 rounded-5 cursor-pointer"
        >
          <FlexColCenter>
            {layout === "col" ? (
              <LayoutPanelLeft size={20} fill="#130F26" />
            ) : (
              <LayoutPanelTop size={20} fill="#130F26" />
            )}
          </FlexColCenter>
        </button>
      </FlexRowCenterBtw>
      <br />

      {/* business card lists */}
      <BusinessCardContainer layout={layout} />

      {/* Filtering component */}
      {showFilter && (
        <BusinessesFilterComponent
          closeFilter={() => setShowFilter(false)}
          getfilterData={() => {}}
          businessesCategories={businessCategory}
        />
      )}
    </div>
  );
}
