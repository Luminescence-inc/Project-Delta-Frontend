import React from "react";
import "../style.scss";
import { FlexColStart } from "components/Flex";
import { IOption, UserBusinessList } from "types/business";
import { CloudinaryConfig } from "config";
import { ColLayoutCard, RowLayoutCard } from "./LayoutCards";

type Props = {
  layout: "col" | "row";
  data: UserBusinessList[];
  businessCategories: IOption[] | undefined;
};

export default function BusinessCardContainer({
  layout,
  data,
  businessCategories,
}: Props) {
  const constructDOP = (
    daysOfWeek: string[] | null,
    openTime: string | null,
    closeTime: string | null
  ) => {
    return daysOfWeek?.map((day) => {
      return {
        day: day,
        ot: openTime,
        ct: closeTime,
      };
    });
  };

  const constructLogoUrl = (url: string | null) => {
    return `https://res.cloudinary.com/${CloudinaryConfig.cloudName}/image/upload/c_fill,q_500/${url}.jpg`;
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
                name={bd.name}
                categories={categories}
                location={`${bd.city}, ${bd.stateAndProvince}`}
                daysOfOps={daysOfOperation}
                phone={bd.phoneNumber || ""}
                image={constructLogoUrl(bd.logoUrl) || ""}
                id={bd.uuid}
                _key={bd.uuid}
              />
            ) : (
              <RowLayoutCard
                name={bd.name}
                categories={categories}
                location={`${bd.city}, ${bd.stateAndProvince}`}
                daysOfOps={daysOfOperation}
                phone={bd.phoneNumber || ""}
                image={constructLogoUrl(bd.logoUrl) || ""}
                id={bd.uuid}
                _key={bd.uuid}
              />
            );
          })
        : null}
    </FlexColStart>
  );
}
