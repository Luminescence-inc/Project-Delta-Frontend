import React from "react";
import {
  FlexColStart,
  FlexRowCenter,
  FlexRowCenterBtw,
  FlexRowStart,
} from "components/Flex";
import ChevronLeftIcon from "assets/icons/chevron-left.svg?react";
import defaultImg from "assets/images/default-img.jpeg";
import "./details.scss";

const categories = ["Food", "Groceries", "Fashion"];

export default function BusinessDetails() {
  return (
    <FlexColStart className="w-full h-full px-28 business-details-container">
      {/* breadcrumb */}
      <FlexRowStart className="w-auto gap-15">
        <ChevronLeftIcon />
        <a
          href="#"
          className="ntw text-12 font-hn-light font-bold leading-14 underline"
          style={{
            color: "#0E2D52",
          }}
        >
          Explore Businesses
        </a>
      </FlexRowStart>

      {/* business image */}
      <FlexRowStart className="w-full mt-10">
        <img
          src={defaultImg}
          alt="business"
          className="ntw w-full h-183 rounded-10"
        />
      </FlexRowStart>

      <FlexColStart className="h-44 mt-20">
        <h2 className="ntw text-20 font-bold font-hn-bold business-name leading-10">
          {"Mama's Kitchen"}
        </h2>

        {/* categories */}
        <FlexRowCenterBtw className="w-auto gap-10">
          {categories &&
            categories.map((c) => {
              return (
                <FlexRowCenter className="gap-10" key={c}>
                  <span className="ntw text-11 leading-13 font-normal font-hn-light category-name">
                    {c}
                  </span>
                  {categories[categories.length - 1] !== c && (
                    <span
                      className="ntw text-5"
                      style={{
                        color: "#17BEBB",
                      }}
                    >
                      ⏺
                    </span>
                  )}
                </FlexRowCenter>
              );
            })}
        </FlexRowCenterBtw>
      </FlexColStart>
    </FlexColStart>
  );
}
