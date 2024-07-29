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
            const id = business.uuid;
            const name = business.name;
            const loc = `${business.city}, ${business.stateAndProvince}`;
            const combinedUrl = `/biz/${name}-${loc}/${id}`;
            return (
              <a
                key={business.uuid}
                href={combinedUrl}
                aria-label={`View ${business.name}`}
              >
                <h1>{business.name}</h1>
                <p>{business.description}</p>
                <p>{loc}</p>
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
