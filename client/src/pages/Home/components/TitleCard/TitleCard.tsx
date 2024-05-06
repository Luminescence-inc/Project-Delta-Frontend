import { FlexColStartCenter } from "@components/Flex";
import { cn } from "@/utils";

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
        "w-full h-auto text-center px-[30px] gap-3 pb-20",
        className
      )}
    >
      <h5 className="font-hnB font-bold text-[13px] leading-[24px] tracking-normal text-teal-100 h-[24px] ">
        {title}
      </h5>
      <h1 className="font-hnB font-bold text-[30px] leading-[37px] tracking-normal text-center text-blue-200 mt-[6px]">
        {header}
      </h1>
      <p className="font-hnL font-normal text-[15px] leading-[25px] tracking-normal h-[24px] text-center text-gray-100">
        {subTitle}
      </p>
    </FlexColStartCenter>
  );
};

export default TitleCard;
