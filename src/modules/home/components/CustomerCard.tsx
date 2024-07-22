"use client";
import { FlexColStart, FlexRowStart } from "@components/Flex";
import { cn } from "@/lib/utils";

interface CustomerCardProps {
  className?: string;
  header: string;
  subTitle: string;
  icon: JSX.Element;
  style?: object;
}

const CustomerCard = ({
  className,
  icon,
  header,
  subTitle,
  style,
}: CustomerCardProps) => {
  return (
    <FlexRowStart
      className={cn(
        "w-full h-auto text-left mt-[15px] pb-[20px] pt-[10px] ",
        className
      )}
      style={style}
    >
      {icon}
      <FlexColStart className="w-auto gap-[24px]">
        <h2 className="font-pp font-semibold text-[20px] leading-[24.42px] text-left text-blue-200 ">
          {header}
        </h2>
        <p className="font-pp font-normal text-[15px] text-gray-103 text-left leading-[24.42px] ">
          {subTitle}
        </p>
      </FlexColStart>
    </FlexRowStart>
  );
};

export default CustomerCard;
