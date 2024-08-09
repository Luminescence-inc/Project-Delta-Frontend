"use client";
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

const buttonVariants = cva(
  "relative px-4 py-3 flex items-center justify-center gap-5 w-fit h-[48px] rounded-[6px] font-inter font-semibold text-white-100 whitespace-nowrap",
  {
    variants: {
      intent: {
        primary:
          "bg-blue-200 hover:bg-blue-200/90 disabled:bg-blue-200/10 disabled:cursor-not-allowed disabled:text-white-400 text-white-100",
        secondary:
          "bg-white-100 text-brand-green-primary hover:bg-[#F4FBF6] focus:shadow-brand-green-shd active:bg-brand-green-shd disabled:bg-brand-disabled border-solid border-[2px] border-brand-green-primary ",
        success:
          "bg-brand-success-primary hover:bg-brand-success-hover focus:bg-brand-success-focused active:bg-brand-success-pressed disabled:bg-brand-disabled disabled:cursor-not-allowed ",
        tertiary:
          "bg-brand-green-ttr text-brand-green-primary hover:bg-[#F4FBF6] focus:shadow-brand-green-shd active:bg-brand-green-shd disabled:bg-brand-disabled disabled:cursor-not-allowed ",
        transparent:
          "bg-none disabled:bg-brand-disabled disabled:cursor-not-allowed border-[2px] border-solid border-blue-200 text-blue-200 ",
        error:
          "bg-red-305 text-white-100 hover:bg-brand-red-hover focus:bg-brand-red-focused active:bg-brand-red-pressed disabled:bg-red-305/70 disabled:cursor-not-allowed",
        dark: "bg-dark-100/90 text-white-100 hover:bg-dark-100 focus:bg-dark-100 active:bg-dark-100 disabled:bg-brand-disabled disabled:cursor-not-allowed",
        none: ''
      },
      size: {
        sm: "text-sm py-2",
        md: "text-base py-3",
        lg: "text-lg py-4",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "md",
    },
  }
);

export interface ButtonVariants
  extends DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    VariantProps<typeof buttonVariants> {}

export interface ButtonProps extends ButtonVariants {
  children: React.ReactNode;
  className?: React.ComponentProps<"div">["className"];
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  href?: string;
  spinnerColor?: string;
  spinnerSize?: string | number;
  hardRefresh?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  isLoading,
  disabled,
  leftIcon,
  rightIcon,
  className,
  href,
  spinnerColor,
  spinnerSize,
  hardRefresh,
  ...props
}) => {
  const classNames = twMerge(buttonVariants(props), className);

  if (href) {
    return (
      <>
        {hardRefresh ? (
          // @ts-expect-error
          <a href={href} className={classNames && classNames} {...props}>
            {leftIcon && leftIcon}
            {children}
            {rightIcon && rightIcon}
          </a>
        ) : (
          // @ts-expect-error
          <Link href={href} relative="path" className={classNames && classNames} {...props}>
           {leftIcon && leftIcon}
            {children}
            {rightIcon && rightIcon}
          </Link>
        )}
      </>
    );
  }

  return (
    <button
      disabled={(isLoading ?? disabled) || disabled}
      className={classNames}
      {...props}
    >
      <div className="w-full h-full absolute top-0 flex flex-col items-center justify-center">
        <svg
          width={spinnerSize ?? "20"}
          height={spinnerSize ?? "20"}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className={twMerge(
            " animate-spin transition delay-[.2] ",
            isLoading ? "opacity-1 visible" : "opacity-0 hidden"
          )}
        >
          <path
            fill={spinnerColor ?? "#000"}
            d="M12 21a9 9 0 1 1 6.18-15.55a.75.75 0 0 1 0 1.06a.74.74 0 0 1-1.06 0A7.51 7.51 0 1 0 19.5 12a.75.75 0 0 1 1.5 0a9 9 0 0 1-9 9Z"
          />
        </svg>
      </div>
      <div
        className={twMerge(
          "flex items-center justify-center gap-2",
          isLoading ? "opacity-0" : "opacity-1"
        )}
      >
        {leftIcon}
        {children}
        {rightIcon && (
          <span
            style={{
              opacity: isLoading ? 0 : 1,
            }}
          >
            {rightIcon}
          </span>
        )}
      </div>
    </button>
  );
};

export default Button;
