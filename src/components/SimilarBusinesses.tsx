"use client";
import { searchForBusinesses } from "@/api/business";
import { FlexColCenter, FlexColStart } from "@components/Flex";
import { useBusinessCtx } from "@context/BusinessCtx";
import { useEffect, useState } from "react";
import { IOption } from "@/types/business";
import { IBusinessProfile, ISearch } from "@/types/business-profile";
import {
  constructBizImgUrl,
  constructDOP,
  constructSearchUrl,
  isImgUrlValid,
} from "@/utils";
import { LoaderComponent } from "@components/Loader";
import BusinessesNotfound from "@/components/NotFound";
import {
  ColLayoutCard,
  RowLayoutCard,
} from "@/modules/search/components/LayoutCard";

interface SimilarBusinessesProps {
  businessCategory: string;
  allCategories: IOption[] | undefined;
  country: string;
  city: string;
  stateAndProvince: string;
  currentBusinessId: string;
}

type CombBusinessesDataTypes = IBusinessProfile & { category: string[] };

const SimilarBusinesses = ({
  businessCategory,
  allCategories,
  country,
  city,
  stateAndProvince,
  currentBusinessId,
}: SimilarBusinessesProps) => {
  const { layout } = useBusinessCtx();
  const allBusinessCategories = useBusinessCtx().businessCategory;
  const [businesses, setBusinesses] = useState<CombBusinessesDataTypes[] | []>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!businessCategory || !country) {
      setLoading(false);
      return;
    }

    const categoryName = allBusinessCategories?.find(
      (c) => c.uuid === businessCategory
    )?.value;

    // construct searchQuery
    const searchQuery = {
      filters: [
        {
          targetFieldName: "businessCategoryUuid",
          values: [categoryName],
        },
        {
          targetFieldName: "country",
          values: [country],
        },
      ],
    } as ISearch;

    const getBusinesses = async () => {
      setLoading(true);

      const queryParams = constructSearchUrl(searchQuery || { filters: [] });

      const result = await searchForBusinesses(queryParams);
      const data = result.data?.data.businessProfiles;

      // filter out current business from similar businesses
      const businessData = data?.data
        .filter(
          (business: IBusinessProfile) => business.uuid !== currentBusinessId
        )
        .filter(
          (business: IBusinessProfile) =>
            business.city === city &&
            business.stateAndProvince === stateAndProvince
        ) as CombBusinessesDataTypes[];

      // recreate business data with categories
      const formattedBusinessData = [] as CombBusinessesDataTypes[];

      // append categories to business data
      for (const business of businessData) {
        const category = allCategories?.find(
          (c) => c.uuid === business?.businessCategoryUuid
        );
        if (category) {
          business["category"] = [category.value];
        }
        formattedBusinessData.push(business);
      }

      setBusinesses(formattedBusinessData);
      setLoading(false);
    };

    getBusinesses();
  }, [businessCategory, country, city, stateAndProvince, currentBusinessId]);

  if (!businessCategory || !country) return null;

  const defaultImg = "/assets/images/default-img.jpeg";

  return (
    <FlexColStart className="w-full mt-[20px]">
      {loading ? (
        <FlexColCenter className="w-full">
          <LoaderComponent />
        </FlexColCenter>
      ) : (
        <FlexColStart className="w-full gap-[20px]">
          {businesses.length > 0 ? (
            businesses.map((business) => {
              const daysOfOperation = constructDOP(
                business?.daysOfOperation!,
                business?.openTime!,
                business?.closeTime!
              );

              const businessImg = constructBizImgUrl(business.logoUrl!);
              return layout === "col" ? (
                <ColLayoutCard
                  name={business.name ?? "N/A"}
                  categories={business?.category as string[]}
                  location={`${business.city}, ${business.stateAndProvince}`}
                  daysOfOps={daysOfOperation}
                  phone={business.phoneNumber ?? "N/A"}
                  image={!isImgUrlValid(businessImg) ? defaultImg : businessImg}
                  _key={business.uuid!}
                  id={business.uuid}
                  key={business.uuid}
                  _urlLocation={`${business.country}-${business.stateAndProvince}`}
                />
              ) : (
                <RowLayoutCard
                  name={business.name ?? "N/A"}
                  categories={business?.category as string[]}
                  location={`${business.city}, ${business.stateAndProvince}`}
                  daysOfOps={daysOfOperation}
                  phone={business.phoneNumber ?? "N/A"}
                  image={!isImgUrlValid(businessImg) ? defaultImg : businessImg}
                  _key={business.uuid!}
                  id={business.uuid}
                  key={business.uuid}
                  _urlLocation={`${business.country}-${business.stateAndProvince}`}
                />
              );
            })
          ) : (
            <BusinessesNotfound />
          )}
        </FlexColStart>
      )}
    </FlexColStart>
  );
};

export default SimilarBusinesses;
