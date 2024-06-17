import {
  FlexColStart,
  FlexRowCenter,
  FlexRowCenterBtw,
  FlexRowEnd,
  FlexRowStart,
  FlexRowStartCenter,
} from "@components/Flex";
import { MapPin, Phone } from "@components/icons";
import { cn, determineBusOpTime } from "@/utils";
import { Link } from "react-router-dom";

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

const NAME_CONSTRAINT = 30;

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
        className="w-full max-h-[260px] px-[5px] py-[5px]"
      >
        <div
          className="w-full h-auto rounded-[10px]"
          style={{
            background: "#e2efff",
            backgroundImage: `url(${
              image ?? "/assets/images/default-img.jpeg"
            })`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "137px",
          }}
        ></div>
        <FlexColStart className="w-full px-[4px] py-[2px] gap-0">
          <h2 className="text-[15px] font-bold font-inter text-blue-200 leading-[18px] mt-[10px]">
            {name.length > NAME_CONSTRAINT
              ? name.slice(0, NAME_CONSTRAINT) + "..."
              : name}
          </h2>

          {/* categories */}
          <FlexRowCenterBtw className="gap-[2px] mt-1">
            {categories &&
              categories.map((c) => {
                return (
                  <FlexRowCenter className="gap-[2px]" key={c}>
                    <span className="text-[11px] leading-[13px] font-light font-inter text-gray-103">
                      {c}
                    </span>
                    {categories[categories.length - 1] !== c && (
                      <span className="h-[3px] w-[3px] rounded-full text-[6px] bg-teal-100"></span>
                    )}
                  </FlexRowCenter>
                );
              })}
          </FlexRowCenterBtw>

          {/* location */}
          <FlexRowStartCenter className="gap-[5px] h-[16px] py-[15px]">
            <MapPin size={15} className="stroke-gray-100/70" />
            <span className="text-[13px] font-normal font-inter text-blue-200 mt-[3px]">
              {location}
            </span>
          </FlexRowStartCenter>

          {/* opening time */}
          <FlexRowCenterBtw className="w-full">
            <FlexRowStartCenter className="gap-[10px]">
              {hasBusinessClosed && hasBusinessClosed.isOpened ? (
                <>
                  <span className="text-[11px] font-normal font-inter leading-[13px] text-teal-100">
                    Open
                  </span>
                  <span className="h-[3px] w-[3px] rounded-full text-[6px] bg-dark-105"></span>

                  <span className="text-[11px] font-normal font-inter leading-[13px]">
                    Closes {hasBusinessClosed.closingTime}
                  </span>
                </>
              ) : (
                <span className="text-[11px] font-normal font-inter leading-[13px] text-red-301">
                  Closed
                </span>
              )}
            </FlexRowStartCenter>

            <button
              // href={`tel:${phone}`}
              onClick={() => window.open(`tel:${phone}`)}
              className="flex flex-row items-center justify-center text-blue-200 bg-blue-202 w-[81px] h-[25px] px-[5px] rounded-full gap-[5px] text-[12px] businesss-call-line"
            >
              <Phone size={15} className="stroke-blue-200/80" />
              <span className="text-[12px] font-medium font-inter leading-[14px] mt-[2px]">
                Call me
              </span>
            </button>
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
  image,
  id,
}: BusinessCardProps) => {
  const hasBusinessClosed = daysOfOps ? determineBusOpTime(daysOfOps) : null;

  return (
    <CardNavigateWrapper id={id}>
      <CardWrapper className="w-full max-h-[108px]">
        <FlexRowStart className="w-full px-[5px] py-[5px]">
          <div
            className="w-full h-auto rounded-[10px]"
            style={{
              width: "64px",
              minWidth: "64px",
              background: "#e2efff",
              backgroundImage: `url(${
                image ?? "/assets/images/default-img.jpeg"
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "95px",
            }}
          ></div>
          <FlexColStart className="w-full px-[5px] gap-0">
            <h2 className="text-[15px] font-bold font-inter text-blue-200 leading-[18px] mt-[10px]">
              {name.length > NAME_CONSTRAINT
                ? name.slice(0, NAME_CONSTRAINT) + "..."
                : name}
            </h2>

            {/* categories */}
            <FlexRowCenterBtw className="w-auto gap-2">
              {categories &&
                categories.map((c) => {
                  return (
                    <FlexRowCenter className="gap-[2px]" key={c}>
                      <span className="text-[11px] leading-[13px] font-light font-inter text-gray-103">
                        {c}
                      </span>
                      {categories[categories.length - 1] !== c && (
                        <span className="h-[3px] w-[3px] rounded-full text-[6px] bg-teal-100"></span>
                      )}
                    </FlexRowCenter>
                  );
                })}
            </FlexRowCenterBtw>

            {/* location */}
            <FlexRowStartCenter className="gap-[5px] h-[16px] py-[15px]">
              <MapPin size={15} className="stroke-gray-100/70" />
              <span className="text-[13px] font-normal font-inter text-blue-200 mt-[3px]">
                {location}
              </span>
            </FlexRowStartCenter>

            {/* opening time */}
            <FlexRowCenterBtw className="w-full">
              <FlexRowStartCenter className="w-auto gap-[10px]">
                {hasBusinessClosed && hasBusinessClosed.isOpened ? (
                  <>
                    <span className="text-[11px] font-normal font-inter leading-[13px] text-teal-100">
                      Open
                    </span>
                    <span className="h-[3px] w-[3px] rounded-full text-[6px] bg-dark-105"></span>

                    <span className="text-[11px] font-normal font-inter leading-[13px]">
                      Closes {hasBusinessClosed.closingTime}
                    </span>
                  </>
                ) : (
                  <span className="text-[11px] font-normal font-inter leading-[13px] text-red-301">
                    Closed
                  </span>
                )}
              </FlexRowStartCenter>

              <FlexRowEnd className="w-auto">
                <button
                  // href={`tel:${phone}`}
                  onClick={() => window.open(`tel:${phone}`)}
                  className="flex flex-row items-center justify-center text-blue-200 bg-blue-202 w-[35px] h-[25px] px-[5px] rounded-full gap-[5px] text-[12px] businesss-call-line"
                >
                  <Phone size={15} className="stroke-blue-200/80" />
                </button>
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
      className={cn("w-full rounded-[10px] shadow-lg bg-white-100", className)}
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
  return (
    <Link
      to={`/biz/${id}`}
      className="w-full outline-none border-none bg-none cursor-pointer"
      key={id}
      onClick={(e) => {
        const target =
          (e.target as HTMLElement)?.parentElement?.classList.contains(
            "businesss-call-line"
          ) ||
          (e.target as HTMLElement)?.classList.contains("businesss-call-line");

        // prevent redirecting to specified page and opening the tel-phone number on that page
        if (target) {
          console.log("target exiusts");
          e.preventDefault();
          return;
        }
      }}
    >
      {children}
    </Link>
  );
};
