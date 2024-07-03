import { allBusinessCategories } from "@/api/business";
import {
  FlexColStart,
  FlexRowCenter,
  FlexRowCenterBtw,
  FlexRowStart,
  FlexRowStartBtw,
} from "@/components/Flex";
import { Mail, MapPin, Phone } from "@/components/icons";
import BusinessesNotfound from "@/components/NotFound";
import ReadMoreText from "@/components/ReadMoreText";
import RenderSocialLinks from "@/components/RenderSocialLink";
import SimilarBusinesses from "@/components/SimilarBusinesses";
import { bizConnectAPI } from "@/config";
import BackBtn from "@/module/businessDetails/components/BackBtn";
import ContactCard from "@/module/businessDetails/components/ContactCard";
import OpeningHoursDrd from "@/module/businessDetails/components/OpeningHoursDrd";
import SocialLinks from "@/module/businessDetails/components/SocialLinks";
import type { IOption } from "@/types/business";
import type { IBusinessProfile } from "@/types/business-profile";
import { constructBizImgUrl, determineBusOpTime, removeAMPM } from "@/utils";
import React from "react";

interface BizPageProps {
  params: { loc: string; business_id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

interface BusinessData {}

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default async function BusinessPage({
  params,
  searchParams,
}: BizPageProps) {
  const loc = params["loc"];
  const business_id = params["business_id"];
  const {
    data: { categories, businessDetails },
    error,
  } = await getBusinessById(business_id);

  const prefixWithZero = (time: string) => {
    return time.split(":")[0].length > 1 ? time : "0" + time;
  };

  const getCurrentDay = daysOfWeek[new Date().getDay()];

  const construcBizDaysOfOps = () => {
    const bizDaysOfOps: string[] | undefined | null =
      businessDetails?.daysOfOperation;
    const openingTime = businessDetails?.openTime;
    const closingTime = businessDetails?.closeTime;

    if (bizDaysOfOps) {
      return bizDaysOfOps.map((d) => {
        const day = daysOfWeek?.find(
          (day) => day?.toLowerCase() === d.toLowerCase()
        );
        if (day) {
          return {
            day: d,
            ot: removeAMPM(prefixWithZero(openingTime!)) + " AM",
            ct: removeAMPM(prefixWithZero(closingTime!)) + " PM",
          };
        }
        return {
          day: d,
          ot: "Closed",
          ct: "Closed",
        };
      });
    }
    return null;
  };

  const bizDaysOfOps = construcBizDaysOfOps();
  const hasBusinessClosed = bizDaysOfOps
    ? determineBusOpTime(bizDaysOfOps)
    : null;
  const openingHoursCalendar = bizDaysOfOps ?? [];

  // social media links (construct)
  const constructSocialLinks = () => {
    const bizLinks = [
      {
        name: "facebook",
        url: businessDetails?.facebookUrl,
      },
      {
        name: "instagram",
        url: businessDetails?.instagramUrl,
      },
      {
        name: "twitter",
        url: businessDetails?.twitterUrl,
      },
      {
        name: "website",
        url: businessDetails?.websiteUrl,
      },
    ];
    return bizLinks;
  };

  const socialLinks = constructSocialLinks();

  return (
    <FlexColStart className="w-full h-auto px-[28px]">
      <BackBtn />
      {businessDetails ? (
        <>
          {/* business image */}
          <FlexRowStart className="w-full mt-[10px]">
            <img
              src={constructBizImgUrl(businessDetails?.logoUrl!)}
              alt="business"
              className="w-full h-[183px] rounded-[10px]"
            />
          </FlexRowStart>

          {/* categories and business name */}
          <FlexColStart className="h-[44px] mt-[20px]">
            {/* business name */}
            <h2 className="text-[20px] font-bold font-inter text-dark-105 leading-[20px]">
              {businessDetails?.name ?? "N/A"}
            </h2>

            {/* categories */}
            <FlexRowCenterBtw className="w-full gap-[10px] mt-1 mb-5">
              {typeof businessDetails.categories !== "undefined" &&
              businessDetails?.categories.length > 0
                ? businessDetails?.categories?.map((c) => {
                    return (
                      <FlexRowCenter className="gap-[10px]" key={c}>
                        <span className="ntw text-[11px] leading-[13px] font-normal font-inter text-gray-103">
                          {c}
                        </span>
                        {businessDetails.categories[
                          businessDetails.categories.length - 1
                        ] !== c && (
                          <span className="h-[3px] w-[3px] rounded-full text-[6px] bg-teal-100"></span>
                        )}
                      </FlexRowCenter>
                    );
                  })
                : null}
            </FlexRowCenterBtw>
          </FlexColStart>

          {/* description */}
          <FlexColStart className="mt-5">
            <span className="ntw text-[11px] leading-[13px] font-semibold font-inter text-gray-103">
              Description
            </span>

            {/*  readmore */}
            <ReadMoreText text={businessDetails?.description ?? "N/A"} />
            {/* contact info */}
            <FlexColStart className="mt-[15px]">
              <span className="text-[11px] leading-[13px] font-semibold font-inter text-gray-103">
                Contact Info
              </span>

              <FlexColStart className="gap-2">
                <ContactCard
                  title="Address"
                  tagline={
                    `${businessDetails?.city}, ${businessDetails?.stateAndProvince}` ??
                    "N/A"
                  }
                  icon={
                    <MapPin
                      size={18}
                      strokeWidth={1.3}
                      className="stroke-dark-100/90"
                    />
                  }
                />
                <ContactCard
                  title="Mobile"
                  tagline={businessDetails?.phoneNumber ?? "N/A"}
                  icon={
                    <Phone
                      size={18}
                      strokeWidth={1.3}
                      className="stroke-dark-100/90"
                    />
                  }
                />
                <ContactCard
                  title="Email"
                  tagline={businessDetails?.businessEmail ?? "N/A"}
                  icon={
                    <Mail
                      size={18}
                      strokeWidth={1.3}
                      className="stroke-dark-100/90"
                    />
                  }
                />
              </FlexColStart>
            </FlexColStart>
          </FlexColStart>

          {/* opening and closing time */}
          <FlexRowCenter className="gap-[5px] mt-5">
            {hasBusinessClosed && hasBusinessClosed.isOpened ? (
              <>
                <span className="text-[11px] font-normal font-inter leading-[13px] text-teal-100">
                  Open
                </span>
                <span className="h-[3px] w-[3px] rounded-full text-[6px] bg-dark-105"></span>

                <span className="text-[11px] font-normal font-inter leading-[13px] text-dark-105">
                  Closes {removeAMPM(hasBusinessClosed.closingTime!)}PM
                </span>
              </>
            ) : (
              <span className="text-[11px] font-normal font-inter leading-[13px] text-red-301">
                Closed
              </span>
            )}
          </FlexRowCenter>

          {/* opening hours dropdown */}
          <OpeningHoursDrd
            openingHoursCalendar={openingHoursCalendar}
            getCurrentDay={getCurrentDay}
          />

          {/* social links */}
          <SocialLinks socialLinks={socialLinks} />

          {/* divider */}
          <div
            className="w-full"
            style={{
              background: "#DDDDDD",
              border: "0.5px solid #DDDDDD",
            }}
          ></div>

          {/* Similar businesses */}
          <FlexColStart className="w-full mt-5 h-auto pb-[200px]">
            <h3 className="text-[15px] leading-[18px] font-bold font-inter text-blue-200">
              Similar Businesses
            </h3>

            <SimilarBusinesses
              businessCategory={businessDetails.businessCategoryUuid!}
              allCategories={categories!}
              country={businessDetails?.country!}
              stateAndProvince={businessDetails?.stateAndProvince!}
              city={businessDetails?.city!}
              currentBusinessId={businessDetails.uuid!}
            />
          </FlexColStart>
        </>
      ) : (
        <BusinessesNotfound message="Not Found" />
      )}
    </FlexColStart>
  );
}

async function getBusinessById(bizId: string) {
  let error = null;
  let data: {
    businessDetails: (IBusinessProfile & { categories: string[] }) | null;
    categories: IOption[] | null;
  } = {
    businessDetails: null,
    categories: null,
  };
  const [categories, businessDetails] = await Promise.all([
    getCategories(),
    getBusinessDetails(bizId),
  ]);

  if (categories.error) {
    error = categories.error;
  } else if (businessDetails.error) {
    error = businessDetails.error;
  } else if (categories.data && businessDetails.data) {
    data["categories"] = categories.data;
    data["businessDetails"] = businessDetails.data;
    data["businessDetails"]["categories"] =
      categories.data?.length > 0
        ? categories.data
            .filter(
              (c) => c.uuid === businessDetails.data?.businessCategoryUuid
            )
            .map((c) => c.value)
        : [];
  }

  return {
    data,
    error,
  };
}

async function getBusinessDetails(id: string) {
  let error: string | null = null;
  let data: (IBusinessProfile & { categories: string[] }) | null = null;

  try {
    const url = `${bizConnectAPI.baseURL}/api/business-profile/list/${id}`;
    const req = await fetch(url);
    const resp = await req.json();
    data = resp.data["details"];
  } catch (e: any) {
    error = e?.message ?? "An error occurred";
    console.log(e);
  }

  return {
    data,
    error,
  };
}

async function getCategories() {
  let error: string | null = null;
  let data: IOption[] = [];

  try {
    const url = `${bizConnectAPI.baseURL}/api/business-profile/categories`;
    const req = await fetch(url);
    const resp = await req.json();
    data = resp.data["businessCategories"].map((c: any) => ({
      uuid: c.uuid,
      value: c.description,
    }));
  } catch (e: any) {
    error = e?.message ?? "An error occurred";
    console.log(e);
  }

  return {
    data,
    error,
  };
}
