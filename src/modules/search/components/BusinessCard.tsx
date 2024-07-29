"use client";
import { FlexColStart } from "@components/Flex";
import { IOption, UserBusinessList } from "@/types/business";
import { CloudinaryConfig } from "@/config";
import { constructDOP } from "@/utils";
import { ColLayoutCard, RowLayoutCard } from "./LayoutCard";
import { useBusinessCtx } from "@context/BusinessCtx";

interface BusinessCardContainerProps {
  data: UserBusinessList[];
  businessCategories: IOption[] | undefined;
}

const BusinessCardContainer = ({
  data,
  businessCategories,
}: BusinessCardContainerProps) => {
  const { layout } = useBusinessCtx();
  const constructLogoUrl = (url: string | null) => {
    return !url
      ? "/assets/images/default-img.jpeg"
      : `https://res.cloudinary.com/${CloudinaryConfig.cloudName}/image/upload/c_fill,q_500/${url}.jpg`;
  };

  return (
    <FlexColStart className="w-full -translate-y-8 px-[20px] business-card-container gap-[20px]">
      {data?.length > 0
        ? data.map((bd) => {
            const daysOfOperation = constructDOP(
              bd?.daysOfOperation,
              bd.openTime,
              bd.closeTime
            );

            const categories = businessCategories
              ?.filter((c) => c.uuid === bd.businessCategoryUuid)
              .map((c) => c.value);

            return layout === "col" ? (
              <ColLayoutCard
                id={bd.uuid}
                name={bd.name}
                categories={categories}
                location={`${bd.city}, ${bd.stateAndProvince}`}
                daysOfOps={daysOfOperation}
                phone={bd.phoneNumber || ""}
                image={
                  constructLogoUrl(bd.logoUrl) ||
                  "https://res.cloudinary.com/drwt2qqf9/image/upload/v1721488956/default-img_vhxk4d.jpg"
                }
                _key={bd.uuid}
                key={bd.uuid}
                _urlLocation={`${bd.country}-${bd.stateAndProvince}`}
              />
            ) : (
              <RowLayoutCard
                name={bd.name}
                id={bd.uuid}
                categories={categories}
                location={`${bd.city}, ${bd.stateAndProvince}`}
                daysOfOps={daysOfOperation}
                phone={bd.phoneNumber || ""}
                image={constructLogoUrl(bd.logoUrl) || ""}
                _key={bd.uuid}
                key={bd.uuid}
                _urlLocation={`${bd.country}-${bd.stateAndProvince}`}
              />
            );
          })
        : null}
    </FlexColStart>
  );
};

export default BusinessCardContainer;
