

import React, { FC, useEffect, useRef, useState } from "react";
import { FormikProps } from "formik";
import { ChevronDown, X } from "@components/icons";
import { ClickOutside } from "./hooks/useClickOutside";
import { FlexColStart, FlexRowCenter, FlexRowCenterBtw } from "@components/Flex";
import { cn } from "@/lib/utils";

interface IOption {
  uuid: string;
  value: string;
}

interface ISelect {
  label?: string;
  options: IOption[] | undefined;
  name: string;
  formikValue?: string;
  placeholder: string;
  formik?: FormikProps<any> | undefined;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectAlpha: FC<ISelect> = ({
  label,
  options,
  name,
  formikValue,
  formik,
  required,
  placeholder,
  onChange = () => { }
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(formikValue || "");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedValue, setSelectedValue] = useState<IOption | null>(null);

  useEffect(() => {
    if (formikValue) {
      setValue(formikValue);
    }
  }, [formikValue]);

  const handleSelect = (option: IOption) => {
    setSelectedValue(option);
    setValue(option.value);
    setShowDropdown(false);

    formik && formik.setFieldValue(`${name}`, option.value);
    onChange({ target: { name, value: option.value } } as React.ChangeEvent<HTMLSelectElement>);
  };

  const handleCancel = () => {
    setSelectedValue(null);
    setValue("");

    formik && formik.setFieldValue(`${name}`, "");
    onChange({ target: { name, value: "" } } as React.ChangeEvent<HTMLSelectElement>);
  };

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  return (
    <>
      <FlexColStart className="w-full gap-[4px] text-left">
        <label className="text-[14px] font-semibold font-inter text-dark-100/60 whitespace-nowrap">
          {label}{required && (<span className="text-[#F75B4E]">*</span>)}
        </label>
        <button
          className="w-full border-none outline-none bg-none cursor-pointer"

        >
          <FlexRowCenter className="w-full relative">
            <input
              className={cn(
                "w-full h-[46px] border-[1px] border-solid focus:border-none focus:right-0 focus:outline-none ring-0 border-dark-103 tracking-[0px] text-[12px] text-blue-200 p-[12px] cursor-pointer placeholder:text-gray-103 placeholder:font-medium placeholder:text-[13px] placeholder:leading-[15.87px] rounded outline-none placeholder:pl-5",
                "font-inter",
                // showDropdown ? "border-[#4974A5]" : ""
              )}
              type="text"
              placeholder={placeholder}
              value={selectedValue ? selectedValue.value : value}
              onClick={toggleDropdown}
              readOnly
            />
            {formikValue && (
              <span
                className="absolute right-[16px] cursor-pointer"
                onClick={handleCancel}
              >
                {/* <X size={16} /> */}
              </span>
            )}
            <span
              className="absolute right-[16px] cursor-pointer bg-white-100 p-[0.5px] rounded-full"
              onClick={toggleDropdown}
            >
              <ChevronDown width={15} />
            </span>
          </FlexRowCenter>
        </button>

        <ClickOutside
          onClickOutside={() => setShowDropdown(false)}
        >
          <div
            ref={dropdownRef}
            className="w-full items-center relative border-[1px]shadow-md  px-3  rounded-[8px]"
          >
            {showDropdown && (
              <div className="w-full mt-1 absolute z-20 left-0 h-56 hideScrollBar overflow-y-auto bg-white-100 shadow-lg rounded-[8px] gap-0">
                <ul className="w-full text-[12px] text-dark-100 font-normal">
                  {options?.length ? (
                    options.map(option => (
                      <li
                        key={option.uuid}
                        className="p-[16px] cursor-pointer hover:bg-[#EEF7FF]"
                        onClick={() => handleSelect(option)}
                      >
                        {option.value}
                      </li>
                    ))
                  ) : (
                    <li className="p-[16px] cursor-pointer">No options available</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </ClickOutside>
      </FlexColStart>
    </>
  );
};

export default SelectAlpha;

