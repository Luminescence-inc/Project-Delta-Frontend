import { FlexColStartCenter } from "@components/Flex";
import { cn } from "@/lib/utils";

interface TitleCardProps {
  className?: string;
  title: string;
  header: string;
  subTitle: string;
}

const TitleCard = ({ className, title, header, subTitle }: TitleCardProps) => {
  return (
    <FlexColStartCenter
      className={cn(
        "w-full h-auto text-center px-[30px] gap-[4px] pb-20",
        className
      )}
    >
      <h5 className="font-pp font-semibold text-[13px] leading-[24px] tracking-normal text-teal-100 h-[24px] ">
        {title}
      </h5>
      <h1 className="font-pp font-bold text-[30px] leading-[36.63px] tracking-normal text-center text-blue-200 mt-[6px]">
        {header}
      </h1>
      <p className="font-pp font-normal text-[15px] leading-[25px] tracking-normal h-[24px] text-center text-gray-103">
        {subTitle}
      </p>
    </FlexColStartCenter>
  );
};

export default TitleCard;
