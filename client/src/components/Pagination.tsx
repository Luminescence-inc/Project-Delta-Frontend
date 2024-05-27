import React from "react";
import { FlexRowCenter } from "./Flex";
import { Link } from "react-router-dom";

interface IPaginationProps {
  totalPages: number;
  currPage: number;
  setCurrPage: (page: number) => void;
}

export const Pagination = ({
  totalPages,
  currPage,
  setCurrPage,
}: IPaginationProps) => {
  return (
    <FlexRowCenter className="w-full">
      {Array.from({ length: totalPages }, (_, i) => (
        <Link
          key={i}
          to="#"
          onClick={() => setCurrPage(i + 1)}
          className={`${
            currPage === i + 1 ? "bg-pink-102" : "bg-white"
          } w-[40px] h-[40px] rounded-[6px] m-1`}
        >
          {i + 1}
        </Link>
      ))}
    </FlexRowCenter>
  );
};
