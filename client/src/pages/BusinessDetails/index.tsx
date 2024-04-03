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
import ChevronLeftIcon from "assets/icons/chevron-left.svg?react";
import ChevronDownIcon from "assets/icons/chevron-down-2.svg?react";
import LocationMarkerIcon from "assets/icons/location-marker-2.svg?react";
import PhoneIcon from "assets/icons/phone.svg?react";
import MailBoxIcon from "assets/icons/mailbox.svg?react";
import CalendarIcon from "assets/icons/calendar.svg?react";
import defaultImg from "assets/images/default-img.jpeg";
import "./details.scss";
import { cn, determineBusOpTime } from "utils";

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
    <FlexColStart className="w-full h-screen px-28 business-details-container">
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
            calendarOpened ? "px-20 py-10" : "h-0"
          )}
        >
          {openingHoursCalendar.map((day) => {
            return (
              <>
                <div className="ntw w-full daysOfWeek">
                  <FlexRowStartBtw className="w-full">
                    <span
                      className="ntw text-12 font-bold font-hn-light leading-14"
                      style={{
                        color: getCurrentDay === day.day ? "#17BEBB" : "#000",
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
                <div className="ntw w-full time">
                  <FlexRowEnd className="w-full">
                    <span
                      className="ntw text-12 font-bold font-hn-light leading-14 mt-4"
                      style={{
                        color: getCurrentDay === day.day ? "#17BEBB" : "#000",
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
    </FlexColStart>
  );
}

type ReadMoreProps = {
  text?: string;
};

function ReadMoreText({ text }: ReadMoreProps) {
  const [isReadmore, setIsReadmore] = React.useState(false);
  const TEXT_CONSTRAINT = 156;
  const formattedText =
    text && text?.length > TEXT_CONSTRAINT
      ? text.slice(0, TEXT_CONSTRAINT) + "..."
      : text;
  const showReadmore = text && text?.length > TEXT_CONSTRAINT;

  return (
    <FlexRowStart className="w-auto flex-wrap">
      <span className="ntw text-12 font-normal leading-18 font-hn-light">
        {isReadmore ? text : formattedText}
        {showReadmore && (
          <button
            className="ntw text-12 font-hn-light font-bold cursor-pointer readmore-trigger ml-5 border-none outline-none bg-none"
            onClick={() => setIsReadmore(!isReadmore)}
          >
            {isReadmore ? "Read less" : "Read more"}
          </button>
        )}
      </span>
    </FlexRowStart>
  );
}

type ContactCardProps = {
  title: string;
  tagline: string;
  icon: React.ReactNode;
};

function ContactCard({ title, tagline, icon }: ContactCardProps) {
  return (
    <FlexRowStartCenter className="w-full mt-10 gap-10">
      <div className="ntw w-17 h-18">{icon}</div>
      <FlexColStart className="w-auto gap-1">
        <h3 className="ntw text-11 leading-15 font-normal font-hn-light category-name">
          {title}
        </h3>
        <h3
          className="ntw text-13 leading-13 font-normal font-hn-light category-name"
          style={{
            color: "#67A2F1",
          }}
        >
          {tagline}
        </h3>
      </FlexColStart>
    </FlexRowStartCenter>
  );
}
