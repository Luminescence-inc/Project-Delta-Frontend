"use client";
import { FlexRowStart } from "@/components/Flex";
import { ChevronLeft } from "@/components/icons";
import useTrackPageSearch from "@/hooks/useTrackSearch";
import React from "react";

export default function BackBtn() {
  const prevPageSearch = useTrackPageSearch();
  return (
    <a
      href={`/search${prevPageSearch}`}
      className="text-[12px] font-inter font-medium leading-[14px] underline bg-none outline-none border-none cursor-pointer text-gray-103 mt-5"
    >
      <FlexRowStart className="w-auto gap-[4px]">
        <ChevronLeft strokeWidth={1} size={15} />
        Explore Businesses
      </FlexRowStart>
    </a>
  );
}
