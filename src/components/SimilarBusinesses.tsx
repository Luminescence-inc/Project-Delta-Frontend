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

  if (!businessCategory || !country) return null;

  const categoryName = allBusinessCategories?.find(
    (c) => c.uuid === businessCategory
  )?.value;

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

  useEffect(() => {
    if (currentBusinessId) getBusinesses();
  }, [currentBusinessId]);

  if (loading) {
    return (
      <FlexColCenter className="w-full">
        <LoaderComponent />
      </FlexColCenter>
    );
  }

  const defaultImg = "/assets/images/default-img.jpeg";

  return (
    <FlexColStart className="w-full mt-[20px]">
      <FlexColStart className="w-full gap-[20px]">
        {!loading && businesses.length > 0 ? (
          businesses.map((businesses) => {
            const daysOfOperation = constructDOP(
              businesses?.daysOfOperation!,
              businesses?.openTime!,
              businesses?.closeTime!
            );

            const businessesImg = constructBizImgUrl(businesses.logoUrl!);
            return layout === "col" ? (
              <ColLayoutCard
                name={businesses.name ?? "N/A"}
                categories={businesses?.category as string[]}
                location={`${businesses.city}, ${businesses.stateAndProvince}`}
                daysOfOps={daysOfOperation}
                phone={businesses.phoneNumber ?? "N/A"}
                image={
                  !isImgUrlValid(businessesImg) ? defaultImg : businessesImg
                }
                _key={businesses.uuid!}
                id={businesses.uuid}
                key={businesses.uuid}
                _urlLocation={`${businesses.country}-${businesses.stateAndProvince}`}
              />
            ) : (
              <RowLayoutCard
                name={businesses.name ?? "N/A"}
                categories={businesses?.category as string[]}
                location={`${businesses.city}, ${businesses.stateAndProvince}`}
                daysOfOps={daysOfOperation}
                phone={businesses.phoneNumber ?? "N/A"}
                image={
                  !isImgUrlValid(businessesImg) ? defaultImg : businessesImg
                }
                _key={businesses.uuid!}
                id={businesses.uuid}
                key={businesses.uuid}
                _urlLocation={`${businesses.country}-${businesses.stateAndProvince}`}
              />
            );
          })
        ) : (
          <BusinessesNotfound />
        )}
      </FlexColStart>
    </FlexColStart>
  );
};

export default SimilarBusinesses;
