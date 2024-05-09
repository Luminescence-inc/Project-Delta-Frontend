import { Fragment, useEffect, useState } from "react";
import {
  FlexColStart,
  FlexRowCenter,
  FlexRowCenterBtw,
  FlexRowEnd,
  FlexRowStart,
  FlexRowStartBtw,
  FlexRowStartCenter,
} from "@components/Flex";
import ContactCard from "./components/ContactCard";
import ReadMoreText from "./components/ReadmoreText";
import {
  ChevronLeft,
  ChevronDown,
  Phone,
  Mail,
  Calendar,
  MapPin,
} from "@components/icons";
import {
  cn,
  constructBizImgUrl,
  determineBusOpTime,
  removeAMPM,
} from "@/utils";
import RenderSocialLinks from "./components/RenderSocialLinks";
import { useNavigate, useParams } from "react-router-dom";
import { useBusinessCtx } from "@context/BusinessCtx";
import { IBusinessProfile } from "@/types/business-profile";
import { getBusinessProfileById } from "@/api/business";
import SimilarBusinesses from "./SimilarBusinesses";
import { LoaderComponent } from "@components/Loader";
import BusinessesNotfound from "./components/Notfound";

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
  const { businessCategory } = useBusinessCtx();
  // page loading set to TRUE by default before accessing the query params
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [calendarOpened, setCalendarOpened] = useState(false);
  const [businessDetails, setBusinessDetails] = useState<
    (IBusinessProfile & { categories: string[] }) | null
  >(null);

  // active link tooltip
  const [activeLinkTt, setActiveLinkTt] = useState("");

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
    try {
      setPageLoading(true);
      const businessProfile = await getBusinessProfileById(id);
      const data = businessProfile.data?.data;
      const details = data?.details;

      setPageLoading(false);

      //! for now, it N-N relationship (i.e one category id assign to one business profile).
      const categoryId = details?.businessCategoryUuid;
      const category = businessCategory?.find((c) => c.uuid === categoryId);

      if (category) {
        setBusinessDetails({
          ...details,
          categories: [category.value],
        });
      }
    } catch (e: any) {
      setPageLoading(false);
      console.log(e);
    }
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

  if (pageLoading) {
    return (
      <FlexRowCenter className="w-full mt-20 gap-10">
        <LoaderComponent />
      </FlexRowCenter>
    );
  }

  return (
    <FlexColStart className="w-full h-auto px-[28px]">
      {/* breadcrumb */}
      <button
        className="text-[12px] font-inter font-medium leading-[14px] underline bg-none outline-none border-none cursor-pointer text-gray-103"
        onClick={() => navigate("/explore-businesses")}
      >
        <FlexRowStart className="w-auto gap-[4px]">
          <ChevronLeft strokeWidth={1} />
          Explore Businesses
        </FlexRowStart>
      </button>

      {businessDetails && !pageLoading ? (
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
          <FlexColStart className="mt-10">
            <span className="ntw text-[11px] leading-[13px] font-semibold font-inter text-gray-103">
              Description
            </span>

            {/*  readmore */}
            <ReadMoreText text={businessDetails?.description ?? "N/A"} />
          </FlexColStart>

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
          <FlexColStart className="w-full mt-[10px] bg-white-100 rounded-[5px] h-auto p-0  shadow-sm border-[.5px] border-gray-103/10">
            <button
              className="w-full h-[40px] mt-[0px] outline-none border-none rounded-[5px] flex items-center justify-between px-[20px] bg-none cursor-pointer"
              onClick={() => {
                setCalendarOpened(!calendarOpened);
              }}
            >
              <FlexRowStartCenter className="w-auto gap-1">
                <Calendar size={15} className="stroke-dark-100/60 mr-1" />
                <span className="text-[11px] font-semibold font-inter leading-[10px] mt-[1px] text-blue-200">
                  View opening hours
                </span>
              </FlexRowStartCenter>
              <ChevronDown
                style={{
                  transform: calendarOpened ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </button>
            {/* grid */}
            {openingHoursCalendar.length > 0 && calendarOpened && (
              <div
                className={cn(
                  "w-full h-auto grid grid-cols-4 gap-[10px] overflow-hidden",
                  calendarOpened ? "h-auto py-[10px]" : "h-0 p-0"
                )}
              >
                {openingHoursCalendar.map((day) => {
                  return (
                    <Fragment key={day.day}>
                      <div className="w-full col-span-2 px-[20px] ">
                        <FlexRowStartBtw className="w-full">
                          <span
                            className="text-[12px] font-normal font-inter leading-[14px]"
                            style={{
                              color:
                                getCurrentDay === day.day
                                  ? "#17BEBB"
                                  : "#0E2D52",
                            }}
                          >
                            {day.day}
                          </span>
                          <span
                            className="h-[3px] w-[3px] mt-[6px] rounded-full text-[6px]"
                            style={{
                              background:
                                getCurrentDay === day.day
                                  ? "#17BEBB"
                                  : "#0E2D52",
                            }}
                          ></span>
                        </FlexRowStartBtw>
                      </div>
                      <div className="w-full col-span-2 px-[20px]">
                        <FlexRowEnd className="w-full">
                          <span
                            className="text-[12px] font-normal font-inter leading-[14px] mt-[3px]"
                            style={{
                              color:
                                getCurrentDay === day.day
                                  ? "#17BEBB"
                                  : "#0E2D52",
                            }}
                          >
                            {day.ot} - {day.ct}
                          </span>
                        </FlexRowEnd>
                      </div>
                    </Fragment>
                  );
                })}
              </div>
            )}
          </FlexColStart>

          {/*  social media links */}
          <FlexColStart className="w-full mt-[15px] pb-[100px]">
            <h3 className="text-[13px] leading-[15px] font-bold font-inter">
              Follow our social media
            </h3>
            <FlexRowStartBtw className="w-auto gap-[20px] mt-[10px]">
              {socialLinks.map((link) => (
                <RenderSocialLinks
                  url={link.url!}
                  name={link.name as any}
                  activeTtip={activeLinkTt}
                  setActiveTtip={setActiveLinkTt}
                  key={link.name}
                />
              ))}
            </FlexRowStartBtw>
          </FlexColStart>

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
              allCategories={businessCategory}
              country={businessDetails?.country!}
              currentBusinessId={businessDetails.uuid!}
            />
          </FlexColStart>
        </>
      ) : !pageLoading && !businessDetails ? (
        <BusinessesNotfound message="Not Found" />
      ) : null}
    </FlexColStart>
  );
}
