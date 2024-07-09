"use client";
import {
  FlexColStart,
  FlexRowEnd,
  FlexRowStartBtw,
  FlexRowStartCenter,
} from "@/components/Flex";
import { Calendar, ChevronDown } from "@/components/icons";
import { cn } from "@/lib/utils";
import React, { Fragment } from "react";

interface IOpeningHoursProps {
  openingHoursCalendar: { day: string; ot: string; ct: string }[];
  getCurrentDay: string;
}

export default function OpeningHoursDrd({
  openingHoursCalendar,
  getCurrentDay,
}: IOpeningHoursProps) {
  const [calendarOpened, setCalendarOpened] = React.useState(false);
  return (
    <FlexColStart className="w-full mt-[10px] bg-white-100 rounded-[5px] h-auto p-0  shadow-sm border-[.5px] border-gray-103/10">
      <button
        className="w-full h-[40px] mt-[0px] outline-none border-none rounded-[5px] flex items-center justify-between px-[20px] bg-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => {
          setCalendarOpened(!calendarOpened);
        }}
        disabled={openingHoursCalendar.length === 0}
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
                          getCurrentDay === day.day ? "#17BEBB" : "#0E2D52",
                      }}
                    >
                      {day.day}
                    </span>
                    <span
                      className="h-[3px] w-[3px] mt-[6px] rounded-full text-[6px]"
                      style={{
                        background:
                          getCurrentDay === day.day ? "#17BEBB" : "#0E2D52",
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
                          getCurrentDay === day.day ? "#17BEBB" : "#0E2D52",
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
  );
}
