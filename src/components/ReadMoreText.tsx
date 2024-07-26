"use client";
import { FlexRowStart } from "@components/Flex";
import React from "react";

type ReadMoreProps = {
  text?: string;
};

export default function ReadMoreText({ text }: ReadMoreProps) {
  const [isReadmore, setIsReadmore] = React.useState(false);
  const TEXT_CONSTRAINT = 156;
  const formattedText =
    text && text?.length > TEXT_CONSTRAINT
      ? text.slice(0, TEXT_CONSTRAINT) + "..."
      : text;
  const showReadmore = text && text?.length > TEXT_CONSTRAINT;

  return (
    <FlexRowStart className="w-auto flex-wrap">
      <span className="text-[12px] font-normal font-pp text-blue-200 leading-[18px]">
        {isReadmore ? text : formattedText}
        {showReadmore && (
          <button
            className="text-[12px] text-teal-100 font-inter font-semibold cursor-pointer readmore-trigger ml-[5px] border-none outline-none bg-none"
            onClick={() => setIsReadmore(!isReadmore)}
          >
            {isReadmore ? "Read less" : "Read more"}
          </button>
        )}
      </span>
    </FlexRowStart>
  );
}
