"use client";
import Image from "next/image";
import { FlexColCenter, FlexColStart, FlexRowStartCenter } from "./Flex";
import { useEffect, useState } from "react";

export default function BlockDesktopView({
  override = false,
}: {
  override?: boolean;
}) {
  const [isMobile, setIsMobile] = useState(false);

  const checkMobile = () => {
    const { innerWidth } = window;
    if (innerWidth > 700) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    // Initial check
    checkMobile();

    window.addEventListener("resize", (e) => checkMobile());

    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);

  if (!isMobile) return null;
  if (override) return null;

  return (
    <FlexColStart className="w-screen h-screen fixed top-0 left-0 z-[99999] bg-white-100 px-7 md:px-10">
      <FlexColCenter className="w-full h-auto mt-10 gap-2 mb-5 text-center">
        <Image
          src={"/assets/images/logo/logo-header.svg"}
          width={165}
          height={28}
          alt=""
        />
        <h1 className="text-[1.5rem] font-semibold font-pp text-blue-200 text-center p-[10px]">
          Web View Notification
        </h1>
        <p className="text-[1em] md:text-md font-pp font-normal text-blue-200 text-center p-[10px]">
          For an awesome experience, please switch to your mobile phone. Thanks
        </p>
      </FlexColCenter>
    </FlexColStart>
  );
}
