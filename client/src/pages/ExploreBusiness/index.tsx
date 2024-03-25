import {
  FlexColStart,
  FlexColStartCenter,
  FlexRowStart,
  FlexRowStartBtw,
  FlexRowStartCenter,
} from "components/Flex";
import React from "react";
import "./style.scss";
import { SearchIcon } from "lucide-react";

export default function ExploreBusiness() {
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
      <FlexRowStartBtw className="w-full px-20 mt-10">
        <button className="ntw w-full bg-white px-15 py-15 rounded-10 border-none cursor-pointer font-helvetical">
          <FlexRowStartCenter className="w-full">
            <SearchIcon size={20} color="#9090A7" />
            <p className="ntw text-15" style={{ color: "#9090A7" }}>
              Search business
            </p>
          </FlexRowStartCenter>
        </button>
      </FlexRowStartBtw>
    </div>
  );
}
