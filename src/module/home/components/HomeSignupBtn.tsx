"use client";
import { FlexColCenter } from "@/components/Flex";
import Button from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import React from "react";

/**
 * @name C - Client component
 * @returns React.ReactElement
 */
export default function HomeSignupBtn() {
  const { loading, userDetails } = useAuth();

  if (!loading && !userDetails) return null;

  return (
    <FlexColCenter
      className="w-full max-w-[197px] "
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "40px",
      }}
    >
      <Button
        intent="primary"
        href="/signup"
        className="w-full max-w-[197px] h-[55px] px-[15px] py-[15px] rounded-md bg-white-100 hover:bg-white-100/90 "
      >
        <span className="font-hnM font-bold text-[14px] leading-[14px] text-left text-blue-200 ">
          Sign Up
        </span>
      </Button>
    </FlexColCenter>
  );
}
