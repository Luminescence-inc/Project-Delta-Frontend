"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { FlexColStart, FlexRowCenter } from "@components/Flex";

interface IInputProps {
  label?: string;
  inputClassname?: React.ComponentProps<"input">["className"];
  parentClassname?: React.ComponentProps<"div">["className"];
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps & IInputProps>(
  (
    {
      className,
      type,
      inputClassname,
      parentClassname,
      leftIcon,
      rightIcon,
      label,
      ...props
    },
    ref
  ) => {
    return (
      <FlexColStart className="w-full gap-[4px] text-left pb-5">
        <label className="text-[14px] font-medium font-pp text-dark-100/60">
          {label}
        </label>
        <FlexRowCenter
          className={cn(
            "w-full h-[46px] relative p-[16px] rounded-[5px]",
            "w-full px-0 border border-white-400/50",
            parentClassname
          )}
        >
          {leftIcon}
          <input
            type={type}
            className={cn(
              "flex h-10 w-full font-pp text-blue-200 placeholder:text-dark-104 rounded-md border border-input bg-none text-[12px] file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none  focus-visible:ring-white-100/20 focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:bg-none target:bg-none ",
              "w-full px-3 outline-none border-none",
              inputClassname
            )}
            ref={ref}
            {...props}
            autoComplete="off"
          />
          {rightIcon}
        </FlexRowCenter>
      </FlexColStart>
    );
  }
);
Input.displayName = "Input";

export default Input;
