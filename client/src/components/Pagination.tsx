import React, { useEffect } from "react";
import { FlexRowCenter, FlexRowStartCenter } from "./Flex";
import { useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "./icons";
import { cn } from "@/utils";

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
  location: ReturnType<typeof useLocation>;
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
  const location = useLocation();
  const query = new URLSearchParams(location.search);
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

    // Show ellipsis if needed
    if (startPage >= 2) {
      pages.push(
        <span
          key="start-ellipsis"
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

  return (
    <FlexRowCenter className="w-full mt-10">
      <FlexRowStartCenter className="w-auto">
        {/* Prev Button */}
        <a
          href={`${location.pathname}?page=${prevPage}&${query.toString()}`}
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

        {renderPageLinks()}

        {/* Next Button */}
        <a
          href={`${location.pathname}?page=${nextPage}&${query.toString()}`}
          className={cn(
            "w-[40px] h-[40px] rounded-[6px] flex items-center justify-center",
            Number(activePage) < totalPages ? "bg-white-300" : "bg-white-100"
          )}
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
        </a>
      </FlexRowStartCenter>
    </FlexRowCenter>
  );
};
