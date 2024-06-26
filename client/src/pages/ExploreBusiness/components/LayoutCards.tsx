import {
  FlexColStart,
  FlexRowCenter,
  FlexRowCenterBtw,
  FlexRowEnd,
  FlexRowStart,
  FlexRowStartCenter,
} from "components/Flex";
import defaultBgImg from "assets/images/default-img.jpeg";
import MapPin from "assets/icons/location-marker.svg?react";
import Phone from "assets/icons/phone.svg?react";
import { cn, determineBusOpTime } from "utils";
import "../style.scss";
import { useNavigate } from "react-router-dom";

interface BusinessCardProps {
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
}

const NAME_CONSTRAINT = 35;

export const ColLayoutCard = ({
  name,
  categories,
  location,
  daysOfOps,
  phone,
  image,
  id,
  _key,
}: BusinessCardProps) => {
  const hasBusinessClosed = daysOfOps ? determineBusOpTime(daysOfOps) : null;

  return (
    <CardNavigateWrapper id={id}>
      <CardWrapper
        key={_key}
        style={{ maxHeight: "260px" }}
        className="px-5 py-5"
      >
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
        <FlexColStart className="w-full px-4 py-2 gap-0">
          <h2 className="ntw text-15 font-bold font-hn-bold business-name leading-18 mt-10">
            {name.length > NAME_CONSTRAINT
              ? name.slice(0, NAME_CONSTRAINT) + "..."
              : name}
          </h2>

          {/* categories */}
          <FlexRowCenterBtw className="w-auto gap-2">
            {categories &&
              categories.map((c) => {
                return (
                  <FlexRowCenter className="gap-2" key={c}>
                    <span className="ntw text-11 leading-13 font-normal font-hn-light category-name">
                      {c}
                    </span>
                    {categories[categories.length - 1] !== c && (
                      <span
                        className="ntw h-3 w-3 rounded-100 text-6"
                        style={{
                          background: "#17BEBB",
                        }}
                      ></span>
                    )}
                  </FlexRowCenter>
                );
              })}
          </FlexRowCenterBtw>

          {/* location */}
          <FlexRowStartCenter className="w-auto gap-5 h-16 py-15">
            <MapPin />
            <span className="ntw text-13 font-normal font-hn-light location-text mt-3">
              {location}
            </span>
          </FlexRowStartCenter>

          {/* opening time */}
          <FlexRowCenterBtw className="w-full">
            <FlexRowStartCenter className="w-auto gap-10">
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
                    Closes {hasBusinessClosed.closingTime}
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
            </FlexRowStartCenter>

            <a
              href={`tel:${phone}`}
              className="ntw flex flex-row items-center justify-center businesss-call-line w-auto w-81 h-25 px-5 rounded-100 gap-5 text-12 font-bold font-hn-light leading-14"
              style={{
                borderRadius: "100px",
              }}
            >
              <Phone />
              <span className="ntw text-12 font-bold font-hn-light leading-14 mt-2">
                Call me
              </span>
            </a>
          </FlexRowCenterBtw>
        </FlexColStart>
      </CardWrapper>
    </CardNavigateWrapper>
  );
};

export const RowLayoutCard = ({
  name,
  categories,
  location,
  daysOfOps,
  phone,
  _key,
  image,
  id,
}: BusinessCardProps) => {
  const hasBusinessClosed = daysOfOps ? determineBusOpTime(daysOfOps) : null;
  return (
    <CardNavigateWrapper id={id}>
      <CardWrapper
        key={_key}
        style={{
          maxHeight: "108px",
        }}
      >
        <FlexRowStart className="w-full px-5 py-5">
          <div
            className="ntw w-full business-card-image rounded-10"
            style={{
              width: "64px",
              minWidth: "64px",
              background: "#e2efff",
              backgroundImage: `url(${image ?? defaultBgImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "95px",
            }}
          ></div>
          <FlexColStart className="w-full px-5 gap-0">
            <h2 className="ntw text-15 font-bold font-hn-bold business-name leading-18">
              {name.length > NAME_CONSTRAINT
                ? name.slice(0, NAME_CONSTRAINT) + "..."
                : name}
            </h2>

            {/* categories */}
            <FlexRowCenterBtw className="w-auto gap-2">
              {categories &&
                categories.map((c) => {
                  return (
                    <FlexRowCenter className="gap-2" key={c}>
                      <span className="ntw text-11 leading-13 font-normal font-hn-light category-name">
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
            <FlexRowCenter className="w-auto gap-5 h-16 mt-15 pb-10">
              <MapPin />
              <span className="ntw text-13 font-normal font-hn-light location-text mt-2">
                {location}
              </span>
            </FlexRowCenter>

            {/* opening time */}
            <FlexRowCenterBtw className="w-full">
              <FlexRowStartCenter className="w-auto gap-10">
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
                        background: "#17BEBB",
                      }}
                    ></span>

                    <span
                      className="ntw text-11 font-normal font-hn-light leading-13"
                      style={{
                        color: "#000",
                      }}
                    >
                      Closes {hasBusinessClosed.closingTime}
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
              </FlexRowStartCenter>

              <FlexRowEnd className="w-auto">
                <a
                  href={`tel:${phone}`}
                  className="ntw flex flex-row items-center justify-center businesss-call-line w-auto w-35 h-25 px-5 py-10 rounded-100 gap-5"
                  style={{
                    borderRadius: "100px",
                  }}
                >
                  <Phone />
                </a>
              </FlexRowEnd>
            </FlexRowCenterBtw>
          </FlexColStart>
        </FlexRowStart>
      </CardWrapper>
    </CardNavigateWrapper>
  );
};

interface CWProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: React.ComponentProps<"div">["className"];
}

const CardWrapper = ({ children, style, className, ...props }: CWProps) => {
  return (
    <div
      className={cn("ntw w-full rounded-10 business-layout-card", className)}
      style={{
        background: "#FFFFFF",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

const CardNavigateWrapper = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();
  return (
    <button
      className="ntw w-full outline-none border-none bg-none cursor-pointer"
      key={id}
      onClick={(e) => {
        const target =
          (e.target as HTMLElement)?.parentElement?.classList.contains(
            "businesss-call-line"
          ) ||
          (e.target as HTMLElement)?.classList.contains("businesss-call-line");

        // prevent redirecting to specified page and opening the tel-phone number on that page
        if (target) {
          e.stopPropagation();
          return;
        }
        navigate(`/business-details/${id}`);
      }}
    >
      {children}
    </button>
  );
};
