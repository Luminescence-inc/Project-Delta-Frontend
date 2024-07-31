"use client";
import {
  FlexColEnd,
  FlexColStart,
  FlexRowCenter,
  FlexRowCenterBtw,
  FlexRowEnd,
  FlexRowStart,
  FlexRowStartCenter,
} from "@components/Flex";
import { MapPin, Phone, Share } from "@components/icons";
import { determineBusOpTime } from "@/utils";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import ReadMoreText from "@/components/ReadMoreText";

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
  _urlLocation: string;
  description: string
}

const NAME_CONSTRAINT = 30;
const DESCRIPTION_CONSTRAINT = 150;

export const ColLayoutCard = ({
  name,
  categories,
  location,
  daysOfOps,
  phone,
  image,
  id,
  _key,
  _urlLocation,
  description
}: BusinessCardProps) => {

  const hasBusinessClosed = daysOfOps ? determineBusOpTime(daysOfOps) : null;
  return (
    <CardNavigateWrapper id={id} name={name} location={_urlLocation}>
      <CardWrapper key={_key} className="w-full ">
        <div
          className="w-full h-auto rounded-[10px]"
          style={{
            background: "#e2efff",
            backgroundImage: `url(${image ?? "/assets/images/default-img.jpeg"
              })`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "328px",
          }}
        ></div>
        <FlexColStart className="w-full px-[4px] py-[2px] gap-0 mt-[10px]">
          <h2 className="text-[15px] font-bold font-pp text-blue-200 leading-[18.31px]">
            {name.length > NAME_CONSTRAINT
              ? name.slice(0, NAME_CONSTRAINT) + "..."
              : name}
          </h2>

          {/* description */}
           <FlexRowCenterBtw className="w-full overflow-hidden my-2">
            <span className="text-[11px] text-gray-103 leading-[13.12px] my-1 text-ellipsis truncate text-wrap">
            {description.length > DESCRIPTION_CONSTRAINT
              ? description.slice(0, DESCRIPTION_CONSTRAINT) + "..."
              : description}
              {/* {description} */}
              </span>
          </FlexRowCenterBtw>
          {/* share */}
          <FlexRowCenterBtw className="gap-[10px] w-full">
            <button className="flex flex-row items-center justify-center w-full bg-blue-202 px-[5px] py-[13px] rounded-[5px] gap-[5px] text-[12px] businesss-call-line">
              <span className="text-[12px] font-medium font-pp leading-[14.53px] mt-[2px] text-blue-200">Update Business Details</span>
            </button>

            <div className="bg-blue-204 p-3 round-[5px]">
              <Share size={16} className="stroke-blue-200/80" />
            </div>
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
  _urlLocation,
  description,
}: BusinessCardProps) => {
  const hasBusinessClosed = daysOfOps ? determineBusOpTime(daysOfOps) : null;

  return (
    <CardNavigateWrapper id={id} name={name} location={_urlLocation}>
      <CardWrapper className="w-full pb-[10px]">
        <FlexRowStartCenter className="w-full px-[0px]">
          <div
            className="w-full h-auto rounded-[10px]"
            style={{
              width: "64px",
              minWidth: "64px",
              background: "#e2efff",
              backgroundImage: `url(${image ?? "/assets/images/default-img.jpeg"
                })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "95px",
            }}
          ></div>
          <FlexColStart className="w-full px-[5px] gap-0 mt-2">
            <h2 className="text-[15px] font-bold font-pp text-blue-200 leading-[18.31px]">
              {name.length > NAME_CONSTRAINT
                ? name.slice(0, NAME_CONSTRAINT) + "..."
                : name}
            </h2>


            {/* location */}
            <FlexRowStartCenter className="gap-[5px] my-1 text-ellipsis overflow-hidden">
              <span className="text-[11px] text-gray-103 leading-[13.12px] font-normal text-ellipsis text-wrap">{description.length > DESCRIPTION_CONSTRAINT
              ? description.slice(0, DESCRIPTION_CONSTRAINT) + "..."
              : description}</span>
            </FlexRowStartCenter>


          </FlexColStart>
        </FlexRowStartCenter>
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
      className={cn(
        "w-full rounded-[10px] shadow-white-300 shadow-md bg-white-100 pt-[6px] pr-[8px] pb-[6px] pl-[8px] gap-[10px] ",
        className
      )}
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
  location,
  name,
}: {
  id: string;
  name: string;
  location: string;
  children: React.ReactNode;
}) => {
  const _location = window.location;
  const loc = location.replace(/\s/gi, "-");
  const _name = name.toLowerCase().replace(/\s/gi, "-");
  const params = new URLSearchParams(_location.search);
  const combinedUrl = `/biz/${_name}-${loc}/${id}`;
  return (
    <a
      // to={combinedUrl}
      // state={{
      //   prevQuery: params.toString(),
      // }}
      href={combinedUrl}
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
    </a>
  );
};
