import { FlexColStart } from "@components/Flex";
import { IBusinessProfile, ISearch } from "@/types/business-profile";
import { constructBizImgUrl, constructDOP, isImgUrlValid } from "@/utils";
import BusinessesNotfound from "@/components/NotFound";
import {
  ColLayoutCard,
  RowLayoutCard,
} from "@/modules/search/components/LayoutCard";

interface SimilarBusinessesProps {
  layout: "col" | "row";
  businesses: CombBusinessesDataTypes[];
  windowLocation: string;
}

type CombBusinessesDataTypes = IBusinessProfile & { category: string[] };

const SimilarBusinesses = ({
  businesses,
  layout,
  windowLocation,
}: SimilarBusinessesProps) => {
  if (businesses?.length === 0) return null;

  const defaultImg = "/assets/images/default-img.jpeg";

  return (
    <FlexColStart className="w-full mt-[20px]">
      <FlexColStart className="w-full gap-[20px]">
        {businesses?.length > 0 ? (
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
                windowLocation={windowLocation}
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
                windowLocation={windowLocation}
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
