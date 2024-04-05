import React from "react";
import "../style.scss";
import { FlexColStart } from "components/Flex";
import defaultBgImg from "assets/images/default-img.jpeg";
import {
  BusinessListingLayouts,
  IOption,
  UserBusinessList,
} from "types/business";
import { CloudinaryConfig } from "config";
import { constructDOP } from "utils";
import { ColLayoutCard, RowLayoutCard } from "./LayoutCards";

interface BusinessCardContainerProps {
  layout: BusinessListingLayouts;
  data: UserBusinessList[];
  businessCategories: IOption[] | undefined;
}

const BusinessCardContainer = ({
  layout,
  data,
  businessCategories,
}: BusinessCardContainerProps) => {
  const constructLogoUrl = (url: string | null) => {
    return !url
      ? defaultBgImg
      : `https://res.cloudinary.com/${CloudinaryConfig.cloudName}/image/upload/c_fill,q_500/${url}.jpg`;
  };

  return (
    <FlexColStart className="w-full px-20 business-card-container gap-20">
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
                image={constructLogoUrl(bd.logoUrl) || ""}
                _key={bd.uuid}
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
              />
            );
          })
        : null}
    </FlexColStart>
  );
};

export default BusinessCardContainer;
