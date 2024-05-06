import React from "react";
import { cn } from "@/utils";
import { FlexRowStartCenter } from "@components/Flex";

interface IPill {
  icon: React.ReactNode;
  title: string;
  variant: "pink" | "red" | "green";
  onClick?: () => void;
}

const variants = {
  pink: "bg-pink-102",
  red: "bg-red-102",
  green: "bg-green-102",
};

const Pill = ({ icon, title, variant, onClick }: IPill) => {
  const variantBgColor = variants[variant];
  return (
    <button onClick={onClick} className="w-full bg-none outline-none">
      <FlexRowStartCenter
        className={cn(
          `w-full gap-[12px] p-[16px] rounded-[6px] `,
          variantBgColor
        )}
      >
        {icon}
        <h3 className="text-[16px] font-bold font-hnM leading-[40px] ">
          {title}
        </h3>
      </FlexRowStartCenter>
    </button>
  );
};

export default Pill;
