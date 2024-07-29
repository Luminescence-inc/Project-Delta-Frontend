"use client";
import { FlexRowStart, FlexRowStartCenter } from "@/components/Flex";
import { ChevronLeft } from "@/components/icons";
import { useDataCtx } from "@/context/DataCtx";
import useTrackPageSearch from "@/hooks/useTrackSearch";
import React, { useEffect } from "react";

export default function BackBtn() {
  const { setNavbarBgColor } = useDataCtx();

  useEffect(() => {
    setNavbarBgColor({
      parent: "#F6F8FA",
      child: "#fff",
    });
  }, []);

  const prevPageSearch = useTrackPageSearch();
  return (
    <a
      href={`/search${prevPageSearch}`}
      className="text-[12px] font-pp font-normal leading-[14px] underline bg-none outline-none border-none cursor-pointer text-blue-200 mt-5"
    >
      <FlexRowStartCenter className="w-auto gap-[4px]">
        <ChevronLeft strokeWidth={1.5} size={25} className="stroke-[#130F26]" />
        Explore Businesses
      </FlexRowStartCenter>
    </a>
  );
}
