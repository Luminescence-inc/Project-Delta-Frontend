/** @format */
import * as React from "react";
import { cn } from "@/utils";
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
        <label className="text-[14px] font-semibold font-inter text-dark-100/60">
          {label}
        </label>
        <FlexRowCenter
          className={cn(
            "w-full h-[46px] relative p-[16px] rounded-[5px]",
            parentClassname
          )}
        >
          {leftIcon}
          <input
            type={type}
            className={cn(
              "flex h-10 w-full text-blue-200 placeholder:text-dark-104 rounded-md border border-input bg-background text-[12px] file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none  focus-visible:ring-white-100/20 focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
              inputClassname
            )}
            ref={ref}
            {...props}
          />
          {rightIcon}
        </FlexRowCenter>
      </FlexColStart>
    );
  }
);
Input.displayName = "Input";

export default Input;
