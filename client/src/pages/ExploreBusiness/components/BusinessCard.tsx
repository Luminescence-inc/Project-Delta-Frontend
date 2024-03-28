import React from "react";
import "../style.scss";
import {
  FlexColStart,
  FlexRowCenter,
  FlexRowCenterBtw,
  FlexRowStart,
  FlexRowStartCenter,
} from "components/Flex";
import defaultBgImg from "assets/images/default-img.jpeg";
import { MapPin, Phone } from "lucide-react";
import { IOption, UserBusinessList } from "types/business";
import { CloudinaryConfig } from "config";

type DaysOfOperation = {
  day: string | null;
  ot: string | null; // open time
  ct: string | null; // closing time
};

// determine whether a business is opened or close.
// if it open, return true and closing time for that day,
// otherwise false and null for that day

const isOpened = (daysOfOperation: DaysOfOperation[]) => {
  const daysOfWeeks = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const today = new Date().getDay();
  const day = daysOfOperation.find(
    (d) => d.day!.toLowerCase() === daysOfWeeks[today]
  );
  if (day) {
    const currentTime = Math.abs(new Date().getHours() - 12);
    const closingTime = parseInt(day.ct!.split(":")[0]);
    return currentTime < closingTime
      ? {
          isOpened: true,
          closingTime: day.ct,
        }
      : {
          isOpened: false,
          closingTime: null,
        };
  }
  return { isOpened: false, closingTime: null };
};

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
    <FlexColStart className="w-full px-20 business-card-container">
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

type BusinessCardProps = {
  name: string;
  categories: string[] | undefined;
  location: string;
  daysOfOps:
    | {
        day: string | null;
        ot: string | null;
        ct: string | null;
      }[]
    | undefined;
  phone: string;
  id: string;
  image: string;
  _key: string;
};

function ColLayoutCard({
  name,
  categories,
  location,
  daysOfOps,
  phone,
  image,
  id,
  _key,
}: BusinessCardProps) {
  const hasBusinessClosed = daysOfOps ? isOpened(daysOfOps) : null;

  return (
    <CardWrapper key={_key}>
      <div
        className="ntw business-card-image w-full h-auto rounded-10"
        style={{
          background: "#e2efff",
          backgroundImage: `url(${image ?? defaultBgImg})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "137px",
        }}
      ></div>
      <FlexColStart className="w-full px-4 py-10 gap-0">
        <h2 className="ntw text-18 business-name font-helvetical">{name}</h2>

        {/* categories */}
        <FlexRowCenterBtw className="w-auto gap-2">
          {categories &&
            categories.map((c) => {
              return (
                <FlexRowCenter className="gap-2" key={c}>
                  <span className="ntw text-12 font-light category-name">
                    {c}
                  </span>
                  {categories[categories.length - 1] !== c && (
                    <span
                      className="ntw text-10"
                      style={{
                        color: "#17BEBB",
                      }}
                    >
                      ⏺
                    </span>
                  )}
                </FlexRowCenter>
              );
            })}
        </FlexRowCenterBtw>

        {/* location */}
        <FlexRowStartCenter className="w-auto gap-2 mt-5">
          <MapPin size={16} color="#9090A7" />
          <span className="ntw text-13 font-medium location-text">
            {location}
          </span>
        </FlexRowStartCenter>

        {/* opening time */}
        <FlexRowCenterBtw className="w-full gap-2 mt-10">
          <FlexRowCenter className="w-auto gap-2">
            {hasBusinessClosed && hasBusinessClosed.isOpened ? (
              <>
                <span
                  className="ntw text-11 font-medium category-name"
                  style={{
                    color: "#17BEBB",
                  }}
                >
                  Open
                </span>
                <span
                  className="ntw text-6"
                  style={{
                    color: "#000",
                  }}
                >
                  ⏺
                </span>

                <span
                  className="ntw text-11 font-normal category-name"
                  style={{
                    color: "#000",
                  }}
                >
                  Closes {hasBusinessClosed.closingTime}pm
                </span>
              </>
            ) : (
              <span
                className="ntw text-11 font-medium category-name"
                style={{
                  color: "#ef0a0a",
                }}
              >
                Closed
              </span>
            )}
          </FlexRowCenter>

          <a
            href={`tel:${phone}`}
            className="ntw scale-8 w-auto px-15 py-9 rounded-30 border-none outline-none businesss-call-line"
          >
            <FlexRowCenter className="w-full">
              <Phone size={15} />
              <span className="text-11 font-medium">Call me</span>
            </FlexRowCenter>
          </a>
        </FlexRowCenterBtw>
      </FlexColStart>
    </CardWrapper>
  );
}

function RowLayoutCard({
  name,
  categories,
  location,
  daysOfOps,
  phone,
  _key,
  image,
}: BusinessCardProps) {
  const hasBusinessClosed = daysOfOps ? isOpened(daysOfOps) : null;
  return (
    <CardWrapper key={_key}>
      <FlexRowStart className="w-full">
        <div
          className="ntw business-card-image w-full h-full rounded-10"
          style={{
            width: "64px",
            background: "#e2efff",
            backgroundImage: `url(${image ?? defaultBgImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "120px",
          }}
        ></div>
        <FlexColStart className="w-full px-4 py-10 gap-0">
          <h2 className="ntw text-18 business-name font-helvetical">{name}</h2>

          {/* categories */}
          <FlexRowCenterBtw className="w-auto gap-2">
            {categories &&
              categories.map((c) => {
                return (
                  <FlexRowCenter className="gap-2" key={c}>
                    <span className="ntw text-12 font-light category-name">
                      {c}
                    </span>
                    {categories[categories.length - 1] !== c && (
                      <span
                        className="ntw text-10"
                        style={{
                          color: "#17BEBB",
                        }}
                      >
                        ⏺
                      </span>
                    )}
                  </FlexRowCenter>
                );
              })}
          </FlexRowCenterBtw>

          {/* location */}
          <FlexRowStartCenter className="w-auto gap-2">
            <MapPin size={16} color="#9090A7" />
            <span className="ntw text-13 font-medium location-text">
              {location}
            </span>
          </FlexRowStartCenter>

          {/* opening time */}
          <FlexRowCenterBtw className="w-full gap-2">
            <FlexRowCenter className="w-auto gap-2">
              {hasBusinessClosed && hasBusinessClosed.isOpened ? (
                <>
                  <span
                    className="ntw text-11 font-medium category-name"
                    style={{
                      color: "#17BEBB",
                    }}
                  >
                    Open
                  </span>
                  <span
                    className="ntw text-6"
                    style={{
                      color: "#000",
                    }}
                  >
                    ⏺
                  </span>

                  <span
                    className="ntw text-11 font-normal category-name"
                    style={{
                      color: "#000",
                    }}
                  >
                    Closes {hasBusinessClosed.closingTime}pm
                  </span>
                </>
              ) : (
                <span
                  className="ntw text-11 font-medium category-name"
                  style={{
                    color: "#ef0a0a",
                  }}
                >
                  Closed
                </span>
              )}
            </FlexRowCenter>

            <a
              href={`tel:${phone}`}
              className="ntw scale-8 w-auto px-15 py-9 rounded-30 border-none outline-none businesss-call-line"
            >
              <FlexRowCenter className="w-full">
                <Phone size={15} />
                <span className="text-11 font-medium">Call me</span>
              </FlexRowCenter>
            </a>
          </FlexRowCenterBtw>
        </FlexColStart>
      </FlexRowStart>
    </CardWrapper>
  );
}

type CWProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

function CardWrapper({ children, style, ...props }: CWProps) {
  return (
    <div
      className="ntw w-full h-auto rounded-10 px-15 py-10"
      style={{
        background: "#FFFFFF",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
