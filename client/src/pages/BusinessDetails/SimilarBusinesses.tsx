import { getListOfBusinsessProfile } from "api/business";
import defaultImg from "assets/images/default-img.jpeg";
import { FlexColCenter, FlexColStart, FlexRowStart } from "components/Flex";
import { useBusinessCtx } from "context/BusinessCtx";
import { LoaderCircle } from "lucide-react";
import {
  ColLayoutCard,
  RowLayoutCard,
} from "pages/ExploreBusiness/components/LayoutCards";
import { useEffect, useState } from "react";
import { IOption } from "types/business";
import { IBusinessProfile, ISearch } from "types/business-profile";
import { constructBizImgUrl, constructDOP, isImgUrlValid } from "utils";

interface SimilarBusinessesProps {
  businessCategory: string;
  allCategories: IOption[] | undefined;
  country: string;
  currentBusinessId: string;
}

type CombBusinessesDataTypes = IBusinessProfile & { category: string[] };

const SimilarBusinesses = ({
  businessCategory,
  allCategories,
  country,
  currentBusinessId,
}: SimilarBusinessesProps) => {
  const { layout } = useBusinessCtx();
  const [businesses, setBusinesses] = useState<CombBusinessesDataTypes[] | []>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);

  if (!businessCategory || !country) return null;

  // construct searchQuery
  const searchQuery = {
    filters: [
      {
        targetFieldName: "businessCategoryUuid",
        values: [businessCategory],
      },
      {
        targetFieldName: "country",
        values: [country],
      },
    ],
  } as ISearch;

  const getBusinesses = async () => {
    setLoading(true);
    const result = await getListOfBusinsessProfile(
      {
        page: 1,
        sortBy: "createdUtc",
        sortDirection: "asc",
        limit: 5,
      },
      searchQuery
    );
    const data = result.data?.data.businessProfiles;

    // filter out current business from similar businesses
    const businessData = data?.data.filter(
      (business: IBusinessProfile) => business.uuid !== currentBusinessId
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
    getBusinesses();
  }, [currentBusinessId]);

  if (loading) {
    return (
      <FlexColCenter className="w-full">
        <LoaderCircle size={15} className="loader" />
      </FlexColCenter>
    );
  }

  return (
    <FlexColStart className="w-full mt-20 ">
      <FlexColStart className="w-full gap-20">
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
              />
            );
          })
        ) : (
          <FlexRowStart className="w-full gap-10">
            <span className="">⚠</span>
            <h2 className="ntw text-12 font-bold font-hn-light">
              No business found.
            </h2>
          </FlexRowStart>
        )}
      </FlexColStart>
    </FlexColStart>
  );
};

export default SimilarBusinesses;
