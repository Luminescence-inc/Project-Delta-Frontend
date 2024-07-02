"use client";
import React, { useEffect } from "react";
import { FlexRowCenter, FlexRowStartCenter } from "./Flex";
import { ChevronLeft, ChevronRight } from "./icons";
import { cn } from "@/lib/utils";

interface IPaginationProps {
  totalPages: number;
}

const PaginationLink = ({
  page,
  activePage,
  query,
  location,
}: {
  page: number;
  activePage: string;
  query: URLSearchParams;
  location: ReturnType<any>;
}) => {
  query.set("page", String(page));
  const link = `${location.pathname}?${query.toString()}`;
  return (
    <a
      href={link}
      className={cn(
        "w-[40px] h-[40px] rounded-[6px] m-1 flex items-center justify-center font-hnL",
        activePage === String(page)
          ? "bg-blue-200 font-bold text-white-100"
          : "bg-white-100"
      )}
    >
      {page}
    </a>
  );
};

export const Pagination = ({ totalPages }: IPaginationProps) => {
  const location = window.location;
  const query = new URLSearchParams(window.location.search);
  const [activePage, setActivePage] = React.useState<string>("1");

  useEffect(() => {
    const parsedPage = location.search.replace("?", "").split("&");
    const currPage =
      parsedPage.find((page) => page.includes("page"))?.split("=")[1] ?? "1";
    setActivePage(currPage);
  }, [location.search]);

  const prevPage = Number(activePage) > 1 ? Number(activePage) - 1 : 1;
  const nextPage =
    Number(activePage) < totalPages ? Number(activePage) + 1 : totalPages;

  const renderPageLinks = () => {
    const pages = [];
    const currentPage = Number(activePage);
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    // Always show the first page
    if (totalPages > 1) {
      pages.push(
        <PaginationLink
          key={1}
          page={1}
          activePage={activePage}
          query={query}
          location={location}
        />
      );
    }

    // Show ellipsis if needed
    if (startPage > 2) {
      pages.push(
        <span
          key="start-ellipsis"
          className="w-[40px] h-[40px] flex items-center justify-center"
        >
          ...
        </span>
      );
    }

    // Render the range of pages around the current page
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationLink
          key={i}
          page={i}
          activePage={activePage}
          query={query}
          location={location}
        />
      );
    }

    if (endPage < totalPages - 1) {
      pages.push(
        <span
          key="end-ellipsis"
          className="w-[40px] h-[40px] flex items-center justify-center"
        >
          ...
        </span>
      );
    }

    // Always show the last page
    pages.push(
      <PaginationLink
        key={totalPages}
        page={totalPages}
        activePage={activePage}
        query={query}
        location={location}
      />
    );

    return pages;
  };

  // remove duplicate "page" param
  query.delete("page");

  const isLastPage = Number(activePage) === totalPages;

  if (totalPages === 1) return null;

  return (
    <FlexRowCenter className="w-full mt-10 mb-20">
      <FlexRowStartCenter className="w-auto">
        <RenderNextPrevButton
          direction="prev"
          totalPages={totalPages}
          activePage={activePage}
          url={`${location.pathname}?page=${prevPage}&${query.toString()}`}
          lastPage={isLastPage}
        />

        {totalPages > 1 && renderPageLinks()}

        <RenderNextPrevButton
          direction="next"
          totalPages={totalPages}
          activePage={activePage}
          url={`${location.pathname}?page=${nextPage}&${query.toString()}`}
          lastPage={isLastPage}
        />
      </FlexRowStartCenter>
    </FlexRowCenter>
  );
};

interface RenderNextPrevButtonProps {
  direction: "next" | "prev";
  totalPages: number;
  activePage: string;
  url: string;
  lastPage?: boolean;
}

function RenderNextPrevButton({
  direction,
  activePage,
  totalPages,
  url,
  lastPage,
}: RenderNextPrevButtonProps) {
  return (
    <>
      {lastPage ? (
        direction === "prev" ? (
          <a
            href={url}
            className={cn(
              "w-[40px] h-[40px] rounded-[6px] flex items-center justify-center",
              Number(activePage) > 1 ? "bg-white-300" : "bg-white-100"
            )}
          >
            <ChevronLeft
              size={20}
              strokeWidth={2}
              className={cn(
                Number(activePage) > 1
                  ? "stroke-dark-105"
                  : "stroke-white-200 cursor-not-allowed"
              )}
            />
          </a>
        ) : (
          <button
            className={cn(
              "w-[40px] h-[40px] rounded-[6px] flex items-center justify-center",
              Number(activePage) > 1 ? "bg-white-300/50" : "bg-white-100"
            )}
            disabled={lastPage}
          >
            <ChevronRight
              size={20}
              strokeWidth={2}
              className={cn(
                Number(activePage) < totalPages
                  ? "stroke-dark-105"
                  : "stroke-white-200 cursor-not-allowed"
              )}
            />
          </button>
        )
      ) : (
        <a
          href={url}
          className={cn(
            "w-[40px] h-[40px] rounded-[6px] flex items-center justify-center",
            Number(activePage) > 1 ? "bg-white-300" : "bg-white-100"
          )}
        >
          {direction === "prev" ? (
            <ChevronLeft
              size={20}
              strokeWidth={2}
              className={cn(
                Number(activePage) > 1
                  ? "stroke-dark-105"
                  : "stroke-white-200 cursor-not-allowed"
              )}
            />
          ) : (
            <ChevronRight
              size={20}
              strokeWidth={2}
              className={cn(
                Number(activePage) < totalPages
                  ? "stroke-dark-105"
                  : "stroke-white-200 cursor-not-allowed"
              )}
            />
          )}
        </a>
      )}
    </>
  );
}
