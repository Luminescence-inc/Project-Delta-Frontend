import React from "react";
import { FlexRowCenter } from "./Flex";

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
  return <FlexRowCenter className="w-full"></FlexRowCenter>;
};
