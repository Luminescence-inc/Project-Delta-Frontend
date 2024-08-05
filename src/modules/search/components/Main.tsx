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
import { DEFAULT_COUNTRY, prevPageSearchKeyName } from "@/config";
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
  const { businessCategory, layout, setLayout } = useBusinessCtx();
  const { setNavbarBgColor } = useDataCtx();
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [businesses, setBusinesses] = useState<BusinessesData>({
    data: [],
    limit: 0,
    page: 0,
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
    setNFilters((p) => ({
      ...p,
      ...updates,
    }));
  }, []);

  // apply filters on mount
  const applyFiltersOnMount = useCallback(() => {
    if (loading || !location || initialMountRef.current) return;

    console.log("CALLED 2");
    initialMountRef.current = true;

    const isoCode = location.countryCode;
    const isCountrySupported = countryHelpers.isCountrySupportedByIsoCode(
      isoCode!
    );

    const country = isCountrySupported ? location.country! : DEFAULT_COUNTRY;
    const state = isCountrySupported ? location.state! : "";
    const city = isCountrySupported ? location.city! : "";

    setNFilters((prevFilters) => ({
      ...prevFilters,
      country,
      stateAndProvince: state,
      city,
    }));

    const overrideParams = {
      cn: country,
      ...(state && { st: state }),
      ...(city && { ct: city }),
      ...(nFilters.query && { query: nFilters.query }),
      ...(nFilters.category && { cat: nFilters.category }),

      // only add pagination if it is not already in the URL
      ...(nFilters.pagination?.page && {
        page: nFilters.pagination?.page?.toString(),
      }),
      ...(nFilters.pagination?.limit && {
        limit: nFilters.pagination?.limit?.toString(),
      }),
    };
    overrideQueryParameters(overrideParams);

    if (businesses?.data.length === 0) {
      const nSearchParam = constructNSearchUrlFromFilters({
        ...nFilters,
        country,
        stateAndProvince: state,
        city,
      });
      getBusinessesMut.mutate(nSearchParam);
    }
  }, [
    loading,
    location,
    nFilters.query,
    nFilters.category,
    nFilters.pagination,
    businesses?.data.length,
  ]);

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
              query ? " '" + query + "'" : " businesses"
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

      if (value && value.length > 0) {
        searchParams.query = value;
      }

      const urlSearchParams = new URLSearchParams(searchParams);
      const nSearchParam = urlSearchParams.toString();

      // Update URL using Next.js router
      router.push(`${pathname}?${nSearchParam}`);

      // Perform search
      getBusinessesMut.mutate(nSearchParam);
    }
  };

  const applyFilter = () => {
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

    overrideQueryParameters(overrideParams);

    const params = new URLSearchParams(window.location.search);
    getBusinessesMut.mutate(params.toString());
    setShowFilter(false);
  };

  // Effect to sync URL with state
  useEffect(() => {
    const currentParams = new URLSearchParams(window.location.search);
    const urlQuery = currentParams.get("query");
    if (urlQuery !== query) {
      setQuery(urlQuery);
    }
  }, [searchParams, query]);

  return (
    <FlexColStart className="w-full h-full bg-blue-204 pb-[2em]">
      <FlexColStart className="w-full h-auto px-[20px] mt-3 gap-[5px]">
        <h1 className="text-[25px] md:text-[30px] font-bold font-pp text-blue-200">
          {headline.title}
        </h1>
        <p className="text-[15px] font-medium font-pp leading-[23px] text-gray-103">
          Discover businesses within and beyond your community
        </p>
      </FlexColStart>
      {/* search component */}
      <FlexRowStartCenter className="w-full px-[20px] gap-[5px] bg-transparent">
        <Input
          inputClassname="font-pp px-0 font-normal border-none tracking-[0] placeholder:text-gray-103"
          parentClassname="w-full h-[44px] px-4 bg-white-100 cursor-pointer rounded-[10px] border-none"
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
              <img src={"/assets/icons/layout-panel-top.svg"} />
            ) : (
              <img src={"/assets/icons/layout-panel-left.svg"} />
            )}
          </FlexColCenter>
        </button>
      </FlexRowStartCenter>

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
        onApplyFilters={() => applyFilter()}
      />

      {getBusinessesMut.isPending || pageLoading ? null : (
        <BusinessCardContainer
          data={businesses.data}
          businessCategories={businessCategory}
        />
      )}

      {businesses?.data?.length > 0 &&
        !pageLoading &&
        !getBusinessesMut.isPending && (
          <Pagination
            totalPages={businesses.totalPages}
            urlSearchParam={new URLSearchParams(window.location.search)}
            activePage={String(businesses.page)}
            location={window.location}
            SSR={true}
          />
        )}

      {/* Filtering component */}
      {/* <BusinessesFilterComponent
        closeFilter={() => setShowFilter(false)}
        getfilterData={(filter) => constructQuery(filter)}
        businessesCategories={businessCategory}
        showFilter={showFilter}
      /> */}
    </FlexColStart>
  );
}
