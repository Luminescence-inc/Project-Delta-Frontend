import React from "react";
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
import defaultImg from "assets/images/default-img.jpeg";
import "./details.scss";
import { cn, determineBusOpTime, isImgUrlValid } from "utils";
import RenderSocialLinks from "./components/RenderSocialLinks";
import { ColLayoutCard } from "pages/ExploreBusiness/components/LayoutCards";

const categories = ["Food", "Groceries", "Fashion"];
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const daysOfOps = [
  {
    day: "Monday",
    ot: "8:00",
    ct: "6:00",
  },
  {
    day: "Wednesday",
    ot: "8:00",
    ct: "10:00",
  },
];
const socialLinks = [
  {
    url: "",
    name: "instagram",
  },
  {
    url: "",
    name: "tiktok",
  },
  {
    url: "",
    name: "facebook",
  },
  {
    url: "",
    name: "website",
  },
];

export default function BusinessDetails() {
  const [calendarOpened, setCalendarOpened] = React.useState(false);
  const hasBusinessClosed = daysOfOps ? determineBusOpTime(daysOfOps) : null;

  const prefixWithZero = (time: string) => {
    return time.split(":")[0].length > 1 ? time : "0" + time;
  };

  const getOpeningHours = () => {
    const calendar: { day: string; ot: string; ct: string }[] = [];
    daysOfWeek.forEach((d) => {
      const day = daysOfOps.find(
        (day) => day.day.toLowerCase() === d.toLowerCase()
      );
      if (day) {
        calendar.push({
          day: d,
          ot: prefixWithZero(day.ot) + " AM",
          ct: prefixWithZero(day.ct) + " PM",
        });
      }
    });
    return calendar;
  };
  const openingHoursCalendar = getOpeningHours();
  const getCurrentDay = daysOfWeek[new Date().getDay()];

  return (
    <FlexColStart className="w-full h-auto px-28 business-details-container">
      {/* breadcrumb */}
      <FlexRowStart className="w-auto gap-15">
        <ChevronLeftIcon />
        <a
          href="#"
          className="ntw text-12 font-hn-light font-bold leading-14 underline"
          style={{
            color: "#0E2D52",
          }}
        >
          Explore Businesses
        </a>
      </FlexRowStart>

      {/* business image */}
      <FlexRowStart className="w-full mt-10">
        <img
          src={defaultImg}
          alt="business"
          className="ntw w-full h-183 rounded-10"
        />
      </FlexRowStart>

      {/* categories and business name */}
      <FlexColStart className="h-44 mt-20">
        {/* business name */}
        <h2 className="ntw text-20 font-bold font-hn-bold business-name leading-10">
          {"Mama's Kitchen"}
        </h2>

        {/* categories */}
        <FlexRowCenterBtw className="w-auto gap-10">
          {categories &&
            categories.map((c) => {
              return (
                <FlexRowCenter className="gap-10" key={c}>
                  <span className="ntw text-11 leading-13 font-normal font-hn-light category-name">
                    {c}
                  </span>
                  {categories[categories.length - 1] !== c && (
                    <span
                      className="ntw text-5"
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
      </FlexColStart>

      {/* description */}
      <FlexColStart className=" mt-10">
        <span className="ntw text-11 leading-13 font-normal font-hn-light category-name">
          Description
        </span>

        {/*  readmore */}
        <ReadMoreText text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis omnis sint magni praesentium in dignissimos quo, magnam reiciendis veritatis, sapiente adipisci, fugiat eum. Quia natus optio nisi nostrum expedita quis!" />
      </FlexColStart>

      {/* contact info */}
      <FlexColStart className=" mt-15">
        <span className="ntw text-11 leading-13 font-normal font-hn-light category-name">
          Contact Info
        </span>

        <FlexColStart className="gap-10">
          <ContactCard
            title="Address"
            tagline="440 South Avenue, Suite 48, Toronto, Ontario"
            icon={<LocationMarkerIcon />}
          />
          <ContactCard
            title="Mobile"
            tagline="08012345678"
            icon={<PhoneIcon />}
          />
          <ContactCard
            title="Email"
            tagline="johndoe@mail.com"
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
              className="ntw text-6"
              style={{
                color: "#000",
              }}
            >
              ⏺
            </span>

            <span
              className="ntw text-11 font-normal font-hn-light leading-13"
              style={{
                color: "#000",
              }}
            >
              Closes {hasBusinessClosed.closingTime}pm
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
          className="ntw w-full h-37 outline-none border-none rounded-5 opening-hours-dd-trigger flex items-center justify-between px-20 bg-none"
          onClick={() => {
            setCalendarOpened(!calendarOpened);
          }}
        >
          <FlexRowStartCenter className="w-auto">
            <CalendarIcon />
            <span className="ntw text-11 font-bold font-hn-medium leading-10">
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
            calendarOpened ? "h-auto" : "h-0"
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
                      className="ntw text-6"
                      style={{
                        color: "#17BEBB",
                      }}
                    >
                      ⏺
                    </span>
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
          {socialLinks.map((link) => (
            <RenderSocialLinks
              url="https://github.com/benrobo"
              name={link.name as any}
            />
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
          <ColLayoutCard
            name={"Mama's Kitchen"}
            categories={categories}
            location={"Ontario, Canada"}
            daysOfOps={undefined}
            phone={""}
            image={!isImgUrlValid("") ? defaultImg : "url"}
            _key={"scsdc"}
            id="sdcdsc"
          />
        </FlexColStart>
      </FlexColStart>
    </FlexColStart>
  );
}
