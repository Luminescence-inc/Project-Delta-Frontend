"use client";
import { FlexRowStartCenter, FlexColStart } from "@components/Flex";

type ContactCardProps = {
  title: string;
  tagline: string;
  icon: React.ReactNode;
};

export default function ContactCard({
  title,
  tagline,
  icon,
}: ContactCardProps) {
  return (
    <FlexRowStartCenter className="w-full mt-2 gap-[10px]">
      <div className="w-[17px] h-[18px]">{icon}</div>
      <FlexColStart className="w-auto gap-1">
        <h3 className="text-[11px] leading-[15px] font-normal font-pp text-gray-103">
          {title}
        </h3>
        <h3 className="text-[13px] leading-[13px] font-light font-pp text-blue-102">
          {tagline}
        </h3>
      </FlexColStart>
    </FlexRowStartCenter>
  );
}
