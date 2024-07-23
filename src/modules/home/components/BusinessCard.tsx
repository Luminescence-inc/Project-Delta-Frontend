"use client";
import { FlexColStart } from "@components/Flex";
import { cn } from "@/lib/utils";

interface BusinessCardProps {
  className?: string;
  header: string;
  subTitle: string;
  icon: JSX.Element;
}

const BusinessCard = ({
  className,
  icon,
  header,
  subTitle,
}: BusinessCardProps) => {
  return (
    <FlexColStart
      className={cn(
        "w-full h-[253.21px] text-left mt-[15px] px-[25px] py-[30px] rounded-[14px] border-[2px] border-gray-103/5 opacity-[0.04px] shadow-sm",
        className
      )}
    >
      {icon}
      <FlexColStart className="w-full gap-[10px]">
        <h2 className="font-pp font-semibold text-[20px] leading-[24.42px] text-left text-blue-200 mt-[6px] ">
          {header}
        </h2>
        <p className="font-pp font-normal text-[15px] text-gray-100 text-left leading-[25px] ">
          {subTitle}
        </p>
      </FlexColStart>
    </FlexColStart>
  );
};

export default BusinessCard;
