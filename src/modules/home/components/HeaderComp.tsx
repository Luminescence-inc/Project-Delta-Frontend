"use client";
import { getUserBusinessProfileList } from "@/api/business";
import {
  FlexColCenter,
  FlexColStart,
  FlexRowStartCenter,
} from "@/components/Flex";
import { CtaArrow, Plus, SearchIcon2 } from "@/components/icons";
import Button from "@/components/ui/button";
import { prevPageLocalKeyName } from "@/config";
import { useAuth } from "@/hooks/useAuth";
import type { UserBusinessListResponse } from "@/types/business";
import { useEffect, useState } from "react";

export function HeaderSearchComp() {
  return (
    <FlexColCenter className="w-full">
      <a
        href="/search"
        className="w-full h-[44px] rounded-[10px] flex flex-row items-center justify-start px-[15px] gap-5 cursor-pointer bg-white border-[1px] border-solid border-blue-200 shadow-md"
        onClick={() => {
          // keep track of prev page route
          localStorage.setItem(prevPageLocalKeyName, window.location.pathname);
        }}
      >
        <FlexRowStartCenter className="w-full">
          <SearchIcon2 size={20} className="stroke-gray-103" strokeWidth={1} />
          <span
            className="text-[12px] leading-[14px] font-hnL font-normal relative top-[0px]"
            style={{
              color: "#9090A7",
            }}
          >
            Search businesses
          </span>
        </FlexRowStartCenter>
      </a>
    </FlexColCenter>
  );
}

export function HeaderOnboardingComp() {
  const { userDetails } = useAuth();
  if (userDetails) return null;
  return (
    <div className="w-full">
      <Button
        intent="primary"
        href="/onboarding"
        rightIcon={<CtaArrow strokeWidth={1} className="stroke-white-100" />}
        className="w-full mt-8 rounded-md h-[55px]"
      >
        <span className="font-pp font-semibold text-[14px] ">
          Business Owner? Get Started
        </span>
      </Button>
    </div>
  );
}

export function HeaderBusinessBtn() {
  const { userDetails } = useAuth();
  const [businessPresent, setBusinessPresent] = useState(false);

  useEffect(() => {
    if (userDetails) {
      getUserBusinessProfileList().then((res) => {
        const businessListResponse: UserBusinessListResponse = res.data;
        setBusinessPresent(
          businessListResponse.data?.businessProfiles.length > 0 || false
        );
      });
    }
  }, [userDetails]);

  return (
    <>
      {userDetails && (
        <FlexColStart className="gap-[5px]">
          {businessPresent && (
            <Button
              intent="primary"
              href="/view-business"
              leftIcon={<SearchIcon2 size={25} className="stroke-white-100" />}
              className="w-full mt-8 rounded-md h-[55px]"
            >
              <span className="font-pp font-semibold text-[14px] ">
                View your business
              </span>
            </Button>
          )}
          <Button
            intent="transparent"
            href="/signup/register-business"
            leftIcon={
              <Plus
                strokeWidth={0.8}
                size={25}
                className="fill-blue-200 stroke-none"
              />
            }
            className="w-full mt-8 rounded-md h-[55px]"
          >
            <span className="font-pp font-semibold text-[14px] ">
              {businessPresent
                ? "Create a new business profile"
                : "Create your first business profile"}
            </span>
          </Button>
        </FlexColStart>
      )}
    </>
  );
}