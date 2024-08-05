import Link from "next/link";
import { FlexRowCenter, FlexRowStartCenter } from "./Flex";
import { ChevronLeft, ChevronRight } from "./icons";
import { cn } from "@/lib/utils";

interface IPaginationProps {
  totalPages: number;
  urlSearchParam: URLSearchParams;
  activePage: string;
  location: {
    pathname: string;
  };
  SSR?: boolean;
}

const PaginationLink = ({
  page,
  activePage,
  query,
  location,
  SSR = true,
}: {
  page: number;
  activePage: string;
  query: URLSearchParams;
  location: ReturnType<any>;
  SSR?: boolean;
}) => {
  query.set("page", String(page));
  const link = `${location.pathname}?${query.toString()}`;
  return !SSR ? (
    <Link
      href={link}
      className={cn(
        "w-[40px] h-[40px] rounded-[6px] m-1 flex items-center justify-center font-hnL",
        activePage === String(page)
          ? "bg-blue-200 font-bold text-white-100"
          : "bg-white-100"
      )}
    >
      {page}
    </Link>
  ) : (
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

export const Pagination = ({
  totalPages,
  urlSearchParam,
  activePage,
  location,
  SSR,
}: IPaginationProps) => {
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
          query={urlSearchParam}
          location={location}
          SSR={SSR}
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
          query={urlSearchParam}
          location={location}
          SSR={SSR}
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
        query={urlSearchParam}
        location={location}
        SSR={SSR}
      />
    );

    return pages;
  };

  // remove duplicate "page" param
  urlSearchParam.delete("page");

  const isLastPage = Number(activePage) === totalPages;

  if (totalPages === 1) return null;

  return (
    <FlexRowCenter className="w-full mt-10 mb-20">
      <FlexRowStartCenter className="w-auto">
        <RenderNextPrevButton
          direction="prev"
          totalPages={totalPages}
          activePage={activePage}
          url={`${
            location.pathname
          }?${urlSearchParam.toString()}&page=${prevPage}`}
          lastPage={isLastPage}
          SSR={SSR}
        />

        {totalPages > 1 && renderPageLinks()}

        <RenderNextPrevButton
          direction="next"
          totalPages={totalPages}
          activePage={activePage}
          url={`${
            location.pathname
          }?${urlSearchParam.toString()}&page=${nextPage}`}
          lastPage={isLastPage}
          SSR={SSR}
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
  SSR?: boolean;
}

function RenderNextPrevButton({
  direction,
  activePage,
  totalPages,
  url,
  lastPage,
  SSR = false,
}: RenderNextPrevButtonProps) {
  return (
    <>
      {lastPage ? (
        direction === "prev" ? (
          !SSR ? (
            <Link
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
            </Link>
          ) : (
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
          )
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
      ) : !SSR ? (
        <Link
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
        </Link>
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
