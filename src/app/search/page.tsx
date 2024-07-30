import { Pagination } from "@/components/Pagination";
import {
  extractQueryParam,
  generateTitle,
  getBusinesses,
  getBusinessesWithPagination,
} from "@/helpers/dynamic-seo";
import MainSearchPageComponent from "@/modules/search/components/Main";
import type { IBusinessProfile, ISearch } from "@/types/business-profile";
import type { Metadata } from "next";
import { headers } from "next/headers";

const ExploreBusiness = async () => {
  const data = await getBusinessesBasedOnQueryParams();
  const businesses: IBusinessProfile[] = data.businesses;
  const pagination = data?.pagination;

  return (
    <>
      <MainSearchPageComponent />

      {/* pagination */}
      {businesses.length > 0 && (
        <Pagination
          totalPages={pagination.totalPages}
          urlSearchParam={pagination.urlSearchParam}
          activePage={pagination.activePage}
          location={pagination.location}
        />
      )}

      {/* render hidden link with businesses data for seo purposes */}
      <div className="hidden" data-name="hidden-businesses-seo-data">
        <h1>Top Businesses</h1>
        <div>
          {businesses.map((business) => {
            const { uuid, name, city, stateAndProvince, description } =
              business;
            const _name = name.toLowerCase().replace(/\s/gi, "-");
            const _loc = `${city}-${stateAndProvince}`.replace(/\s/gi, "-");
            const combinedUrl = `/biz/${_name}-${_loc}/${uuid}`;
            return (
              <a
                key={uuid}
                href={encodeURI(combinedUrl)}
                aria-label={`View ${name}`}
              >
                <h1>{name}</h1>
                <p>{description}</p>
                <p>{`${city}, ${stateAndProvince}`}</p>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default ExploreBusiness;

export async function getBusinessesBasedOnQueryParams() {
  const headersList = headers();
  const header_url = headersList.get("x-url") || "";
  const { search } = extractQueryParam(header_url);
  const { businesses, pagination } = await getBusinessesWithPagination(search);
  const urlSearchParam = new URLSearchParams(search);

  return {
    businesses,
    pagination: {
      ...pagination,
      search,
      urlSearchParam,
      activePage: String(pagination.page),
      location: {
        pathname: "/search",
      },
    },
  };
}

// Generate Dynamic Metadata
export async function generateMetadata() {
  const headersList = headers();
  const header_url = headersList.get("x-url") || "";
  const { filters, search } = extractQueryParam(header_url);
  const businesses = await getBusinesses(search);

  const title = generateTitle({
    ...filters,
    businessesLength: businesses.length,
  });

  const topBusinesses =
    businesses.length > 0
      ? businesses
          ?.slice(0, 10)
          .map((b: any) => b.name)
          .join(" - ")
      : "No businesses found";
  const metaDescription = `${title}, - ${topBusinesses}`;

  return {
    title,
    description: metaDescription,
    openGraph: {
      title,
      description: metaDescription,
    },
  } as Metadata;
}
