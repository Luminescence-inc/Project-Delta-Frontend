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
    <div
      className={cn(
        "flex flex-col md:items-center justify-start w-full h-auto text-start  md:px-[30px] gap-[4px] pb-20  md:max-w-4xl md:mx-auto",
        className
      )}
    >
      <h5 className="font-pp font-semibold text-[13px] leading-[24px] tracking-normal text-teal-100 h-[24px] ">
        {title}
      </h5>
      <h1 className="font-pp font-bold text-[30px] leading-[36.63px] tracking-normal md:text-center text-blue-200 mt-[6px]">
        {header}
      </h1>
      <p className="font-pp font-normal text-[15px] leading-[25px] tracking-normal h-[24px] md:text-center text-gray-103">
        {subTitle}
      </p>
    </div>
  );
};

export default TitleCard;
