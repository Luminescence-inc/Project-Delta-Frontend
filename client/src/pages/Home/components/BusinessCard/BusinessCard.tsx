import { FlexColStart } from "@components/Flex";
import { cn } from "@/utils";

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
        "w-full h-auto text-left mt-[15px] px-[25px] py-[30px] rounded-[14px] border-[.5px] opacity-[0.04px] shadow-md ",
        className
      )}
    >
      {icon}
      <h2 className="font-hnM text-[20px] leading-[24px] text-left text-blue-200 mt-[6px] mb-[11px] ">
        {header}
      </h2>
      <p className="font-hnL font-normal text-[15px] text-gray-100 text-left leading-[25px] ">
        {subTitle}
      </p>
    </FlexColStart>
  );
};

export default BusinessCard;
