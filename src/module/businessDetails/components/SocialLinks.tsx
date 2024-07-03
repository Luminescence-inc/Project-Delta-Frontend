"use client";
import { FlexColStart, FlexRowStartBtw } from "@/components/Flex";
import RenderSocialLinks from "@/components/RenderSocialLink";
import React, { useState } from "react";

interface SocialLinkProps {
  socialLinks: { name: string; url: string | undefined }[];
}

export default function SocialLinks({ socialLinks }: SocialLinkProps) {
  const [activeLinkTt, setActiveLinkTt] = useState("");
  return (
    <FlexColStart className="w-full mt-[15px] pb-[100px]">
      <h3 className="text-[13px] leading-[15px] font-bold font-inter">
        Follow our social media
      </h3>
      <FlexRowStartBtw className="w-auto gap-[20px] mt-[10px]">
        {socialLinks.map((link) => (
          <RenderSocialLinks
            url={link.url!}
            name={link.name as any}
            activeTtip={activeLinkTt}
            setActiveTtip={setActiveLinkTt}
            key={link.name}
          />
        ))}
      </FlexRowStartBtw>
    </FlexColStart>
  );
}
