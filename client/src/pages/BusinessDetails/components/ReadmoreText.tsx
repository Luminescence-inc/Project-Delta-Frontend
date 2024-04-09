import { FlexRowStart } from "components/Flex";
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
      <span className="ntw text-12 font-normal leading-18 font-hn-light">
        {isReadmore ? text : formattedText}
        {showReadmore && (
          <button
            className="ntw text-12 font-hn-light font-bold cursor-pointer readmore-trigger ml-5 border-none outline-none bg-none"
            onClick={() => setIsReadmore(!isReadmore)}
          >
            {isReadmore ? "Read less" : "Read more"}
          </button>
        )}
      </span>
    </FlexRowStart>
  );
}
