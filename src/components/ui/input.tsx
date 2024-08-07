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
  required?: boolean
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
      required,
      ...props
    },
    ref
  ) => {
    return (
      <FlexColStart className="w-full  gap-[4px] text-left mb-4">
        <label className="text-sm font-normal leading-[140%] tracking-[0] font-pp text-red-700">
          {label}{required &&(<span className="text-[#F75B4E]">*</span>)}
        </label>
        <FlexRowCenter
          className={cn(
            "flex items-center w-full relative rounded-[5px]",
            "w-full px-0 border border-white-400/50",
            parentClassname
          )}
        >
          {leftIcon}
          <input
            type={type}
            className={cn(
              "flex p-3 w-full font-pp text-blue-200 placeholder:text-dark-104 placeholder:text-[10px] placeholder:leading-[12.21px] placeholder:tracking-[2px] rounded-md border border-input bg-none text-[12px] file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none  focus-visible:ring-white-100/20 focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:bg-none target:bg-none ",
              "w-full px-3 outline-none border-none",
              inputClassname
            )}
            ref={ref}
            {...props}
            autoComplete="off"
          />
          {rightIcon && rightIcon}
        </FlexRowCenter>
      </FlexColStart>
    );
  }
);
Input.displayName = "Input";

export default Input;
