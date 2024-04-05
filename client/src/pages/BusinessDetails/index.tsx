import { useEffect, useState } from "react";
import {
  FlexColStart,
  FlexRowCenter,
  FlexRowCenterBtw,
  FlexRowEnd,
  FlexRowStart,
  FlexRowStartBtw,
  FlexRowStartCenter,
} from "components/Flex";
import ContactCard from "./components/ContactCard";
import ReadMoreText from "./components/ReadmoreText";
import ChevronLeftIcon from "assets/icons/chevron-left.svg?react";
import ChevronDownIcon from "assets/icons/chevron-down-2.svg?react";
import LocationMarkerIcon from "assets/icons/location-marker-2.svg?react";
import PhoneIcon from "assets/icons/phone.svg?react";
import MailBoxIcon from "assets/icons/mailbox.svg?react";
import CalendarIcon from "assets/icons/calendar.svg?react";
import EllipseIcon from "assets/icons/ellipse.svg?react";
import defaultImg from "assets/images/default-img.jpeg";
import "./details.scss";
import { cn, constructDOP, determineBusOpTime, isImgUrlValid } from "utils";
import RenderSocialLinks from "./components/RenderSocialLinks";
import { ColLayoutCard } from "pages/ExploreBusiness/components/LayoutCards";
import { useNavigate, useParams } from "react-router-dom";
import { useBusinessCtx } from "context/BusinessCtx";
import { IBusinessProfile } from "types/business-profile";
import { CloudinaryConfig } from "config";
import { getBusinessProfileById } from "api/business";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function BusinessDetails() {
  const { businessCategory, businesses } = useBusinessCtx();
  // page loading set to TRUE by default before accessing the query params
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [calendarOpened, setCalendarOpened] = useState(false);
  const [businessDetails, setBusinessDetails] = useState<
    (IBusinessProfile & { categories: string[] }) | null
  >(null);
  const navigate = useNavigate();
  const params = useParams();

  const prefixWithZero = (time: string) => {
    return time.split(":")[0].length > 1 ? time : "0" + time;
  };

  const getCurrentDay = daysOfWeek[new Date().getDay()];

  useEffect(() => {
    if (params?.business_id) {
      fetchBusinessProfile(params.business_id);
    }
  }, [params, businessCategory]);

  const fetchBusinessProfile = async (id: string) => {
    const businessProfile = await getBusinessProfileById(id);
    const data = businessProfile.data?.data;
    const details = data?.details;

    //! for now, it N-N relationship (i.e one category id assign to one business profile).
    const categoryId = details?.businessCategoryUuid;
    const category = businessCategory?.find((c) => c.uuid === categoryId);

    if (category) {
      setBusinessDetails({
        ...details,
        categories: [category.value],
      });
    }
    setPageLoading(false);
  };

  const constructBizImgUrl = (url: string | null) => {
    return !url
      ? defaultImg
      : `https://res.cloudinary.com/${CloudinaryConfig.cloudName}/image/upload/c_fill,q_500/${url}.jpg`;
  };

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
            ot:
              prefixWithZero(openingTime!).toLowerCase().replace("am", "") +
              " AM",
            ct:
              prefixWithZero(closingTime!).toLowerCase().replace("pm", "") +
              " PM",
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
  const socialLinks = () => {
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
    ].filter((link) => typeof link.url !== "undefined");
    return bizLinks;
  };

  const getSimilarBusinesses = (biz: IBusinessProfile[]) => {
    const formattedBusinesses = [];
    for (const b of biz) {
      const bizCategoryId = b.businessCategoryUuid;
      const bizCategory = businessCategory?.find(
        (c) => c.uuid === bizCategoryId
      );
      if (b?.uuid !== businessDetails?.uuid) {
        formattedBusinesses.push({
          ...b,
          categories: [bizCategory?.value],
        });
      }
    }

    // loop through formatted businesses and filter based on the categories
    const similarBiz = [];
    for (const fmtbiz of formattedBusinesses) {
      const categories = fmtbiz.categories;
      const currentBizCategory = businessCategory?.find(
        (b) => b.uuid === businessDetails?.businessCategoryUuid
      );
      if (categories.includes(currentBizCategory?.value)) {
        similarBiz.push(fmtbiz);
      }
    }
    return similarBiz;
  };

  const similarBusinesses = getSimilarBusinesses(businesses);

  return (
    <FlexColStart className="w-full h-auto px-28 business-details-container">
      {/* breadcrumb */}
      <FlexRowStart className="w-auto gap-15">
        <ChevronLeftIcon />
        <button
          //   href="#"
          className="ntw text-12 font-hn-light font-bold leading-14 underline bg-none outline-none border-none cursor-pointer"
          style={{
            color: "#0E2D52",
          }}
          onClick={() => navigate("/explore-businesses")}
        >
          Explore Businesses
        </button>
      </FlexRowStart>

      {businessDetails && !pageLoading ? (
        <>
          {/* business image */}
          <FlexRowStart className="w-full mt-10">
            <img
              src={constructBizImgUrl(businessDetails?.logoUrl!)}
              alt="business"
              className="ntw w-full h-183 rounded-10"
            />
          </FlexRowStart>

          {/* categories and business name */}
          <FlexColStart className="h-44 mt-20">
            {/* business name */}
            <h2 className="ntw text-20 font-bold font-hn-bold business-name leading-10">
              {businessDetails?.name ?? "N/A"}
            </h2>

            {/* categories */}
            <FlexRowCenterBtw className="w-auto gap-10">
              {typeof businessDetails.categories !== "undefined" &&
              businessDetails?.categories.length > 0
                ? businessDetails?.categories?.map((c) => {
                    return (
                      <FlexRowCenter className="gap-10" key={c}>
                        <span className="ntw text-11 leading-13 font-normal font-hn-light category-name">
                          {c}
                        </span>
                        {businessDetails.categories[
                          businessDetails.categories.length - 1
                        ] !== c && (
                          <span
                            className="ntw h-3 w-3 rounded-100 text-6"
                            style={{
                              background: "#17BEBB",
                            }}
                          ></span>
                        )}
                      </FlexRowCenter>
                    );
                  })
                : null}
            </FlexRowCenterBtw>
          </FlexColStart>

          {/* description */}
          <FlexColStart className=" mt-10">
            <span className="ntw text-11 leading-13 font-normal font-hn-light category-name">
              Description
            </span>

            {/*  readmore */}
            <ReadMoreText text={businessDetails?.description ?? "N/A"} />
          </FlexColStart>

          {/* contact info */}
          <FlexColStart className=" mt-15">
            <span className="ntw text-11 leading-13 font-normal font-hn-light category-name">
              Contact Info
            </span>

            <FlexColStart className="gap-10">
              <ContactCard
                title="Address"
                tagline={
                  `${businessDetails?.city}, ${businessDetails?.stateAndProvince}` ??
                  "N/A"
                }
                icon={<LocationMarkerIcon />}
              />
              <ContactCard
                title="Mobile"
                tagline={businessDetails?.phoneNumber ?? "N/A"}
                icon={<PhoneIcon />}
              />
              <ContactCard
                title="Email"
                tagline={businessDetails?.businessEmail ?? "N/A"}
                icon={<MailBoxIcon />}
              />
            </FlexColStart>
          </FlexColStart>

          {/* opening and closing time */}
          <FlexRowCenter className="w-auto gap-5 mt-10">
            {hasBusinessClosed && hasBusinessClosed.isOpened ? (
              <>
                <span
                  className="ntw text-11 font-normal font-hn-light leading-13 category-name"
                  style={{
                    color: "#17BEBB",
                  }}
                >
                  Open
                </span>
                <span
                  className="ntw h-3 w-3 rounded-100 text-6"
                  style={{
                    background: "#000",
                  }}
                ></span>

                <span
                  className="ntw text-11 font-normal font-hn-light leading-13"
                  style={{
                    color: "#000",
                  }}
                >
                  Closes{" "}
                  {hasBusinessClosed.closingTime
                    ?.toLowerCase()
                    ?.replace("pm", "")}
                  pm
                </span>
              </>
            ) : (
              <span
                className="ntw text-11 font-normal font-hn-light leading-13 category-name"
                style={{
                  color: "#FF9F9F",
                }}
              >
                Closed
              </span>
            )}
          </FlexRowCenter>

          {/* opening hours dropdown */}
          <FlexColStart className="w-full mt-10 opening-hours-dd rounded-5 max-h-271">
            <button
              className="ntw w-full h-37 mt-5 outline-none border-none rounded-5 opening-hours-dd-trigger flex items-center justify-between px-20 bg-none cursor-pointer"
              onClick={() => {
                setCalendarOpened(!calendarOpened);
              }}
            >
              <FlexRowStartCenter className="w-auto">
                <CalendarIcon />
                <span
                  className="ntw text-11 font-bold font-hn-medium leading-10"
                  style={{
                    color: "#0E2D52",
                  }}
                >
                  View opening hours
                </span>
              </FlexRowStartCenter>
              <ChevronDownIcon
                style={{
                  transform: calendarOpened ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </button>
            {/* grid */}
            <div
              className={cn(
                "ntw w-full calendar-grid overflow-hidden",
                calendarOpened ? "h-auto py-10" : "h-0"
              )}
            >
              {openingHoursCalendar.map((day) => {
                return (
                  <>
                    <div className="ntw w-full daysOfWeek px-20 ">
                      <FlexRowStartBtw className="w-full">
                        <span
                          className="ntw text-12 font-bold font-hn-light leading-14"
                          style={{
                            color:
                              getCurrentDay === day.day ? "#17BEBB" : "#0E2D52",
                          }}
                        >
                          {day.day}
                        </span>
                        <span
                          className="ntw h-3 w-3 mt-5 rounded-100 text-6"
                          style={{
                            background:
                              getCurrentDay === day.day ? "#17BEBB" : "#0E2D52",
                          }}
                        ></span>
                      </FlexRowStartBtw>
                    </div>
                    <div className="ntw w-full time px-20">
                      <FlexRowEnd className="w-full">
                        <span
                          className="ntw text-12 font-bold font-hn-light leading-14 mt-4"
                          style={{
                            color:
                              getCurrentDay === day.day ? "#17BEBB" : "#0E2D52",
                          }}
                        >
                          {day.ot} - {day.ct}
                        </span>
                      </FlexRowEnd>
                    </div>
                  </>
                );
              })}
            </div>
          </FlexColStart>

          {/*  social media links */}
          <FlexColStart className="w-full mt-15 pb-100">
            <h3 className="ntw text-13 leading-15 font-boild font-hn-bold">
              Follow our social media
            </h3>
            <FlexRowStartBtw className="w-auto gap-20 mt-10">
              {socialLinks().map((link) => (
                <RenderSocialLinks url={link.url!} name={link.name as any} />
              ))}
            </FlexRowStartBtw>
          </FlexColStart>

          {/* divider */}
          <div
            className="ntw w-full"
            style={{
              background: "#DDDDDD",
              border: "0.5px solid #DDDDDD",
            }}
          ></div>

          {/* Similar businesses */}
          <FlexColStart className="w-full mt-10 h-auto">
            <h3
              className="ntw text-15 leading-18 font-bold font-hn-bold"
              style={{
                color: "#0E2D52",
              }}
            >
              Similar Businesses
            </h3>

            <FlexColStart className="w-full mt-20">
              {similarBusinesses.length > 0 ? (
                similarBusinesses.map((businesses) => {
                  const daysOfOperation = constructDOP(
                    businesses?.daysOfOperation!,
                    businesses?.openTime!,
                    businesses?.closeTime!
                  );

                  const businessesImg = constructBizImgUrl(businesses.logoUrl!);
                  return (
                    <ColLayoutCard
                      name={businesses.name ?? "N/A"}
                      categories={businesses?.categories as string[]}
                      location={"Ontario, Canada"}
                      daysOfOps={daysOfOperation}
                      phone={businesses.phoneNumber ?? "N/A"}
                      image={
                        !isImgUrlValid(businessesImg)
                          ? defaultImg
                          : businessesImg
                      }
                      _key={businesses.uuid!}
                      id={businesses.uuid}
                    />
                  );
                })
              ) : (
                <FlexRowStart className="w-full gap-10">
                  <span className="">⚠</span>
                  <h2 className="ntw text-15 font-bold font-hn-light">
                    No business found.
                  </h2>
                </FlexRowStart>
              )}
            </FlexColStart>
          </FlexColStart>
        </>
      ) : (
        <FlexRowCenter className="w-full mt-50 gap-10">
          <span className="">⚠</span>
          <h2 className="ntw text-15 font-bold font-hn-light">
            No business found.
          </h2>
        </FlexRowCenter>
      )}
    </FlexColStart>
  );
}
