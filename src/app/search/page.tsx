import {
  extractQueryParam,
  generateTitle,
  getBusinesses,
} from "@/helpers/dynamic-seo";
import MainSearchPageComponent from "@/modules/search/components/Main";
import { sleep } from "@/utils";
import type { Metadata } from "next";
import { headers } from "next/headers";

const ExploreBusiness = () => {
  return (
    <>
      <MainSearchPageComponent />
    </>
  );
};
export default ExploreBusiness;

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
