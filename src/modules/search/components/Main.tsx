"use client";
import {
  FlexColCenter,
  FlexColStart,
  FlexColStartCenter,
  FlexRowStartCenter,
} from "@components/Flex";
import { Filter, SearchIcon2 } from "@components/icons";
import BusinessCardContainer from "@/modules/search/components/BusinessCard";
import { UserBusinessList } from "@/types/business";
import { useBusinessCtx } from "@context/BusinessCtx";
import { type INFilters } from "@/types/business-profile";
import { LoaderComponent } from "@components/Loader";
import { useCallback, useEffect, useRef, useState } from "react";
import Input from "@/components/ui/input";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  constructNSearchUrlFromFilters,
  extractQueryParams,
  overrideQueryParameters,
} from "@/utils";
import { DEFAULT_COUNTRY } from "@/config";
import { useDataCtx } from "@/context/DataCtx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import NBusinessFilter from "@/components/NewFilterComponent/NBusinessFilter";
import { useLocation } from "@/hooks/useLocation";
import countryHelpers from "@/helpers/countries-states-city/country";
import { useMutation } from "@tanstack/react-query";
import { searchForBusinesses } from "@/api/business";
import { toast } from "react-toastify";
import { Pagination } from "@/components/Pagination";

dayjs.extend(relativeTime);

interface BusinessesData {
  data: UserBusinessList[];
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}

export default function MainSearchPageComponent() {
  const { businessCategory } = useBusinessCtx();
  const [layout, setLayout] = useState<"row" | "col">("col");
  const { setNavbarBgColor } = useDataCtx();
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [businesses, setBusinesses] = useState<BusinessesData>({
    data: [],
    limit: 0,
    page: 1,
    total: 0,
    totalPages: 0,
  });
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { loading, location } = useLocation();
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [query, setQuery] = useState<string | null>(null);
  const [urlSearchQuery, setUrlSearchQuery] = useState<string>("");
  const [nFilters, setNFilters] = useState<INFilters>({
    category: null,
    country: null,
    stateAndProvince: null,
    city: null,
  });
  const [headline, setHeadline] = useState({
    title: "",
    businesses: "",
  });
  const getBusinessesMut = useMutation({
    mutationFn: async (param: string) => await searchForBusinesses(param),
    onSuccess: (res) => {
      const resp = res?.data?.businessProfiles as BusinessesData;
      if (resp.page === 0) resp.page = 1;
      setBusinesses(resp);
      setPageLoading(false);
    },
    onError: (error) => {
      const err = (error as any).response.data;
      setPageLoading(false);
      toast.error(err.message);
    },
  });

  const initialMountRef = useRef(false);

  // extract filters from query params and set them to nFilters state
  const extractFilterFromQueryParam = useCallback(() => {
    const { filters } = extractQueryParams();
    const paginationKeys = ["page", "limit"];
    const updates = filters.reduce(
      (acc: Partial<INFilters>, f) => {
        const key = paginationKeys.includes(f.targetFieldName)
          ? "pagination"
          : f.targetFieldName === "businessCategoryUuid"
          ? "category"
          : (f.targetFieldName as keyof INFilters);
        const value = paginationKeys.includes(f.targetFieldName)
          ? parseInt(f.values[0])
          : decodeURIComponent(f.values[0]);

        if (key === "pagination") {
          acc.pagination = { ...acc.pagination, [f.targetFieldName]: value };
        } else {
          (acc as any)[key] = value;
        }
        return acc;
      },
      { pagination: { ...nFilters.pagination } }
    );

    // check if layout is set in query params
    const layout = searchParams.get("layout");
    if (layout) setLayout(layout as "row" | "col");
    setNFilters((p) => ({
      ...p,
      ...updates,
    }));
  }, []);

  // apply filters on mount
  const applyFiltersOnMount = useCallback(() => {
    if (loading || !location || initialMountRef.current) return;

    initialMountRef.current = true;

    const { countryCode, country, state, city } = location;
    const isCountrySupported = countryHelpers.isCountrySupportedByIsoCode(
      countryCode!
    );
    const defaultLocation = isCountrySupported
      ? { country, state, city }
      : { country: DEFAULT_COUNTRY, state: "", city: "" };

    const currentParams = new URLSearchParams(window.location.search);
    const overrideParams: Record<string, string> = {};

    if (!currentParams.has("cn")) {
      overrideParams.cn = defaultLocation.country!;
      if (defaultLocation.state) overrideParams.st = defaultLocation.state;
      if (defaultLocation.city) overrideParams.ct = defaultLocation.city;
    }

    // Add other parameters
    Object.entries({
      cn: nFilters.country,
      st: nFilters.stateAndProvince,
      ct: nFilters.city,
      query: nFilters.query,
      cat: nFilters.category,
      layout,
    }).forEach(([key, value]) => {
      if (value) overrideParams[key] = value;
    });

    // Add pagination only if not already in the URL
    if (nFilters.pagination) {
      ["page", "limit"].forEach((param) => {
        if (
          nFilters.pagination &&
          nFilters.pagination[param as keyof typeof nFilters.pagination]
        ) {
          overrideParams[param] =
            nFilters.pagination[
              param as keyof typeof nFilters.pagination
            ]!.toString();
        }
      });
    }

    overrideQueryParameters(overrideParams);

    if (businesses?.data.length === 0) {
      const nSearchParam = constructNSearchUrlFromFilters({
        ...nFilters,
        country: overrideParams.cn,
        stateAndProvince: overrideParams.st || nFilters.stateAndProvince,
        city: overrideParams.ct || nFilters.city,
      });
      getBusinessesMut.mutate(nSearchParam);
    }

    setNFilters((prev) => ({
      ...prev,
      country: overrideParams.cn,
      stateAndProvince: overrideParams.st || prev.stateAndProvince,
      city: overrideParams.ct || prev.city,
    }));
  }, [loading, location, nFilters, layout, businesses?.data.length]);

  useEffect(() => {
    applyFiltersOnMount();
  }, [applyFiltersOnMount]);

  useEffect(() => {
    extractFilterFromQueryParam();
  }, []);

  const generateHeadlineFromQuery = () => {
    return {
      country: nFilters.country || null,
      state: nFilters.stateAndProvince || null,
      city: nFilters.city || null,
      query: nFilters.query || null,
    };
  };

  useEffect(() => {
    if (pageLoading || getBusinessesMut.isPending) return;
    const { country, state, city, query } = generateHeadlineFromQuery();

    const locHeadline = (country: string, state: string, city: string) => {
      const locations = [country, state, city].filter(Boolean).join(", ");
      return locations ? `Near '${locations}'` : "";
    };

    const titlePrefix = `Explore ${
      query ? `"${query}" Businesses` : "Businesses"
    }`;
    const titleSuffix = `${
      city && state
        ? ` Near ${city}, ${state}`
        : city
        ? ` Near ${city}`
        : state
        ? ` Near ${state}`
        : country
        ? ` in ${country}`
        : " Near You"
    }`;

    const top10BusinessesName = businesses.data
      ?.map((b) => b.name)
      .slice(0, 10)
      .join(" - ");

    const title = `${titlePrefix}${titleSuffix}`;

    setHeadline({
      title:
        businesses.data.length === 0
          ? `No result for${
              query ? ` '${query}'` : " businesses"
            } ${locHeadline(country!, state!, city!)}`
          : title,
      businesses: top10BusinessesName,
    });
  }, [businesses, pageLoading, getBusinessesMut.isPending]);

  useEffect(() => {
    const searchParam = new URLSearchParams(window.location.search);
    const _query = searchParam.get("query");

    if (_query && !query) setQuery(_query);

    setNavbarBgColor({
      child: "#fff",
    });
  }, [query, setNavbarBgColor]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.trim();
    setQuery(value.length > 0 ? value : null);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const value = event.currentTarget.value.trim();
      const currentParams = new URLSearchParams(window.location.search);
      const layout = currentParams.get("layout");

      setQuery(value.length > 0 ? value : null);

      // update NFILTERS with query
      setNFilters((prev) => ({
        ...prev,
        query: value,
      }));

      let searchParams: Record<string, string> = {
        ...(nFilters.country && { cn: nFilters.country }),
        ...(nFilters.stateAndProvince && { st: nFilters.stateAndProvince }),
        ...(nFilters.city && { ct: nFilters.city }),
        ...(nFilters.category && { cat: nFilters.category }),
        ...(nFilters.pagination?.limit && {
          limit: nFilters.pagination.limit.toString(),
        }),
      };

      if (value && value.length > 0) searchParams.query = value;
      if (layout) searchParams.layout = layout;

      const urlSearchParams = new URLSearchParams(searchParams);
      const nSearchParam = urlSearchParams.toString();

      // Update URL using Next.js router
      router.push(`${pathname}?${nSearchParam}`);

      // Perform search
      getBusinessesMut.mutate(nSearchParam);
    }
  };

  const applyFilter = () => {
    const currentParams = new URLSearchParams(window.location.search);
    const layout = currentParams.get("layout");
    // check if country exists
    if (!nFilters.country) {
      toast.error("Please select a country");
      return;
    }

    // override the query params
    const overrideParams: Record<string, string> = {
      ...(nFilters.country && { cn: nFilters.country }),
      ...(nFilters.stateAndProvince && { st: nFilters.stateAndProvince }),
      ...(nFilters.city && { ct: nFilters.city }),
      ...(nFilters.category && { cat: nFilters.category }),
      ...(nFilters.query && { query: nFilters.query }),
    };

    if (layout) overrideParams.layout = layout;

    overrideQueryParameters(overrideParams);

    const params = new URLSearchParams(window.location.search);
    getBusinessesMut.mutate(params.toString());
    setShowFilter(false);
  };

  const resetFilters = () => {
    // reset nFilters to initial state
    setNFilters({
      ...nFilters,
      stateAndProvince: null,
      city: null,
      category: null,
      query: null,
    });
    setShowFilter(false);
    setQuery(null);
    setLayout("col");
    overrideQueryParameters({
      cn: nFilters.country!,
      st: null,
      ct: null,
      cat: null,
      query: null,
      page: null,
      limit: null,
    });
    getBusinessesMut.mutate(window.location.search);
  };

  const generatePaginationSearchParams = useCallback(() => {
    const searchParam = constructNSearchUrlFromFilters(nFilters);
    const search = new URLSearchParams(searchParam);
    search.set("layout", layout ?? "row");
    return search;
  }, [nFilters, layout]);

  // Effect to sync URL with state
  useEffect(() => {
    const currentParams = new URLSearchParams(window.location.search);
    const urlQuery = currentParams.get("query");
    if (urlQuery !== query) {
      setQuery(urlQuery);
    }
  }, [searchParams, query]);

  return (
    <FlexColStart className="w-full h-full bg-blue-204 pb-[2em] px-[20px]">
      <FlexColStart className="w-full h-auto mt-3 gap-[5px]">
        <h1 className="text-[25px] md:text-[30px] font-bold font-pp text-blue-200">
          {headline.title}
        </h1>
        <p className="text-[15px] font-medium font-pp leading-[23px] text-gray-103">
          Discover businesses within and beyond your community
        </p>
      </FlexColStart>
      {/* search component */}
      <FlexRowStartCenter className="w-full gap-[5px] bg-transparent">
        <Input
          inputClassname="font-pp px-0 font-normal border-none tracking-[0] placeholder:text-gray-103"
          parentClassname="w-full px-4 bg-white-100 cursor-pointer rounded-[10px] border-none"
          type="text"
          placeholder="Search business"
          leftIcon={
            <SearchIcon2
              size={20}
              strokeWidth={1.2}
              className="stroke-gray-103"
            />
          }
          defaultValue={query ? query : urlSearchQuery}
          onChange={handleInputChange}
          onKeyUp={handleKeyUp}
          autoComplete="off"
        />
        <div className="flex items-center gap-2 pt-5">
        <button
          className="border-none outline-none cursor-pointer rounded-[5px] p-2 flex items-center justify-center bg-blue-50 -translate-y-2"
          onClick={() => setShowFilter(true)}
          >
          <Filter size={15} className="stroke-blue-200" />
        </button>
        <button
          onClick={() => {
            const search = new URLSearchParams(window.location.search);
            const layout = search.get("layout");
            const newLayout = !layout
              ? "row"
              : layout === "col"
              ? "row"
              : "col";
            search.set("layout", newLayout);
            setLayout && setLayout(newLayout);
            router.push(`${window.location.pathname}?${search.toString()}`);
          }}
          className="border-none outline-none cursor-pointer rounded-[10px] p-2 flex items-center justify-center -translate-y-2"
        >
          <FlexColCenter>
            {layout === "col" ? (
              <img src={"/assets/icons/layout-panel-top.svg"} className="w-14" />
            ) : (
              <img src={"/assets/icons/layout-panel-left.svg"} className="w-14" />
            )}
          </FlexColCenter>
        </button>
        </div>
      </FlexRowStartCenter>
      <br />

      <FlexColCenter className="w-full">
        {(pageLoading || getBusinessesMut.isPending) && (
          <div className="mt-5">
            <LoaderComponent />
          </div>
        )}

        {/* not found msg */}
        {(!pageLoading || !getBusinessesMut.isPending) &&
          businesses?.data?.length === 0 && (
            <FlexColStartCenter className="w-full">
              <p className="text-[15px] font-semibold font-inter text-gray-103">
                No business found. Please modify your search
              </p>
            </FlexColStartCenter>
          )}
      </FlexColCenter>

      <NBusinessFilter
        opened={showFilter}
        nFilters={nFilters}
        setNFilters={setNFilters}
        onClose={() => setShowFilter(false)}
        resetFilters={resetFilters}
        onApplyFilters={applyFilter}
      />

      {getBusinessesMut.isPending || pageLoading ? null : (
        <BusinessCardContainer
          data={businesses.data}
          businessCategories={businessCategory}
          layout={layout}
        />
      )}

      {businesses?.data?.length > 0 &&
        !pageLoading &&
        !getBusinessesMut.isPending && (
          <Pagination
            totalPages={businesses.totalPages}
            urlSearchParam={generatePaginationSearchParams()}
            activePage={String(businesses.page)}
            location={window.location}
            SSR={true} // this uses <a> tags to navigate rather than <Link>
          />
        )}
    </FlexColStart>
  );
}
