import { FlexColStart, FlexRowStart } from "@components/Flex";
import { cn } from "@/utils";

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
      <FlexColStart className="w-auto gap-0">
        <h2 className="font-hnM text-[20px] leading-[24px] text-left text-blue-200 mt-[6px] mb-[11px] ">
          {header}
        </h2>
        <p className="font-hnL font-normal text-[15px] text-gray-100 text-left leading-[25px] ">
          {subTitle}
        </p>
      </FlexColStart>
    </FlexRowStart>
  );
};

export default CustomerCard;
