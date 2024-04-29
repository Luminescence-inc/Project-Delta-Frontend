/** @format */

import { FlexColStart, FlexRowCenter } from "components/Flex";
import React from "react";

interface IInput {
  label?: string;
  icon?: React.ReactNode;
  placeholder: string;
  type: string;
  name?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<any, Element>) => void;
}

const Input = ({
  label,
  type,
  icon,
  placeholder,
  name,
  value,
  disabled,
  onChange,
  onBlur,
}: IInput) => {
  return (
    <FlexColStart className="w-full gap-[4px] text-left">
      <label className="text-[14px] font-normal font-hnL text-dark-100">
        {label}
      </label>
      <FlexRowCenter className="w-full relative">
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled ? disabled : false}
          className="w-full h-[46px] border-[1px] border-solid border-dark-103 tracking-[2px] text-[12px] text-blue-200 p-[16px] rounded-[5px] placeholder:text-dark-104"
        />
        <span className="absolute top-[13.5px] right-[20px]">{icon}</span>
      </FlexRowCenter>
    </FlexColStart>
  );
};

export default Input;
