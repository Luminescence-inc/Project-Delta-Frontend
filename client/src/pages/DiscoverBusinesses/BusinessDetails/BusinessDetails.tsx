import React from "react";
import { useState, useEffect } from "react";
import { CloudinaryConfig } from "../../../config";
import Card from "../../Home/components/Card/Card";
import "./BusinessDetails.scss";
import Button from "components/Button/Button";
import { IBusinessProfile } from "types/business-profile";
import { formatDays } from "../helper";
import { IBusinessCategory } from "types/business-profile";
import { getBusinsessCategories } from "api/business";
import defaultImage from "assets/images/default-icon.jpeg";
// import { CloudinaryConfig } from "config";

interface BusinessDetailsProps {
  businessProfile: IBusinessProfile | null;
  onClickReturnToBusinessCatalogue: (item: IBusinessProfile | null) => void;
}

const BusinessDetails: React.FC<BusinessDetailsProps> = ({
  businessProfile,
  onClickReturnToBusinessCatalogue,
}) => {
  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [businessCategoryName, setBusinessCategoryName] = useState<
    string | undefined
  >("");
  let openDays = businessProfile?.daysOfOperation;
  let closeDates = [];
  for (const day of daysOfWeek) {
    if (!openDays?.includes(day)) {
      closeDates.push(day);
    }
  }
  let closeDays = closeDates.length != 0 ? formatDays(closeDates) : null;

  useEffect(() => {
    getBusinsessCategories()
      .then((res) => {
        //console.log(res.data);
        let businessCategories: IBusinessCategory[] =
          res?.data.data.businessCategories;

        let businessCategory = businessCategories.find(
          (thisBusinessCategory) =>
            thisBusinessCategory.uuid === businessProfile?.businessCategoryUuid
        );
        setBusinessCategoryName(businessCategory?.description);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="business-details">
      <header>
        <h2>{businessProfile?.name || ""}</h2>
      </header>

      <Card
        title={businessProfile?.name || ""}
        description={businessProfile?.description}
        imagePath={
          businessProfile?.logoUrl
            ? `https://res.cloudinary.com/${CloudinaryConfig.cloudName}/image/upload/c_fill,q_500/${businessProfile?.logoUrl}.jpg`
            : defaultImage
        }
        email={businessProfile?.businessEmail}
        phoneNumber={businessProfile?.phoneNumber}
        address={businessProfile?.street}
        openDays={businessProfile?.operationInfo}
        closeDays={closeDays}
        usedInBusinessCataloge={false}
        categories={[{ name: businessCategoryName, style: "#d9e2b3" }]}
        socials={[
          { name: "facebook", url: businessProfile?.facebookUrl || "" },
          { name: "instagram", url: businessProfile?.instagramUrl || "" },
          { name: "linkedIn", url: businessProfile?.linkedinUrl || "" },
          { name: "twitter", url: businessProfile?.twitterUrl || "" },
          { name: "website", url: businessProfile?.websiteUrl || "" },
        ]}
        action={
          <Button
            label="Go back to Business Listings"
            variant="primary"
            onClick={() => {
              onClickReturnToBusinessCatalogue(null);
            }}
          />
        }
      />
    </div>
  );
};

export default BusinessDetails;
