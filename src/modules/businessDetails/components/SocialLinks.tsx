"use client";
import { FlexColStart, FlexRowStartBtw } from "@/components/Flex";
import RenderSocialLinks from "@/components/RenderSocialLink";
import React, { useState } from "react";

interface SocialLinkProps {
  socialLinks: { name: string; url: string | undefined }[];
}

export default function SocialLinks({ socialLinks }: SocialLinkProps) {
  return (
    <FlexColStart className="w-full mt-[15px] pb-[30px]">
      <h3 className="text-[13px] leading-[15px] font-semibold font-pp text-blue-200">
        Follow our social media
      </h3>
      <FlexRowStartBtw className="w-auto gap-[20px] mt-[10px]">
        {socialLinks.map((link) => (
          <RenderSocialLinks
            url={link.url!}
            name={link.name as any}
            key={link.name}
          />
        ))}
      </FlexRowStartBtw>
    </FlexColStart>
  );
}
