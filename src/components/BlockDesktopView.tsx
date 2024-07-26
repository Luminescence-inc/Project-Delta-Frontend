"use client";
import Image from "next/image";
import { FlexColCenter, FlexRowStartCenter } from "./Flex";
import { useEffect, useState } from "react";

export default function BlockDesktopView({
  override = false,
}: {
  override?: boolean;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", (e) => {
      const { innerWidth } = window;
      if (innerWidth > 700) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    });

    return () => {
      window.removeEventListener("resize", () => {});
    };
  });

  if (!isMobile) return null;
  if (override) return null;

  return (
    <FlexColCenter className="w-screen h-screen fixed top-0 left-0 z-[99999] bg-white-100 px-7 md:px-10">
      <FlexRowStartCenter className="gap-2 mb-5 text-center">
        <Image
          src={"/assets/images/logo/BizConnectLogo.svg"}
          width={30}
          height={30}
          alt=""
        />
        <h1 className="text-2xl font-bold font-pp text-blue-200">
          BizConnect24
        </h1>
      </FlexRowStartCenter>
      <h1 className="text-md font-bold font-pp text-blue-200 text-center">
        Unsupported Aspect Ratio
      </h1>
      <p className="text-sm md:text-md font-pp font-normal text-white-400 text-center">
        This page isn't available on desktop view. Please consider viewing it on
        mobile phone.
      </p>
    </FlexColCenter>
  );
}
