/** @format */

import { useRef, useState, useEffect } from "react";
import ArrowUpIcon from "assets/icons/arrow-up.svg?react";
import CancelIcon from "assets/icons/cancel-select-icon.svg?react";
import "./Input.scss";
import { FormikProps } from "formik";
import { FlexColStart, FlexRowCenter, FlexRowCenterBtw } from "components/Flex";
import { cn } from "utils";

interface ISelect {
  label: string;
  name: string;
  formikValue: string | undefined;
  formik: FormikProps<any>;
  options: IOption[] | undefined;
  placeholder: string;
}

interface IOption {
  uuid: string;
  value: string;
}

const Select = ({ label, options, name, formikValue, formik }: ISelect) => {
  //Based on the values(string) find the corresponding option (object)
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

    formik.setFieldValue(`${name}`, option.value);
  };

  const handleCancel = () => {
    setSelectedValue(null);
    setValue("");

    formik.setFieldValue(`${name}`, "");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <FlexColStart className="w-full gap-[4px] text-left pb-5">
        <label className="text-[14px] font-extrabold font-hnL text-dark-100">
          {label}
        </label>
        <button
          className="w-full border-none outline-none bg-none cursor-pointer"
          onClick={toggleDropdown}
        >
          <FlexRowCenter className="w-full relative">
            <input
              className={cn(
                "w-full h-[46px] border-[1px] border-solid border-dark-103 tracking-[2px] text-[12px] text-blue-200 p-[16px] rounded-[5px] placeholder:text-dark-104 placeholder:text-[12px]",
                showDropdown ? "cursor-text" : "cursor-pointer"
              )}
              type="text"
              name={name}
              placeholder={label}
              value={value}
              onClick={toggleDropdown}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              // disable suggestions dropdown
              autoComplete="new"
            />
            <ArrowUpIcon
              className={cn(
                "absolute top-[15px] right-[20px]",
                "-rotate-[180deg]"
              )}
              width={14}
              height={14}
            />
          </FlexRowCenter>
        </button>
      </FlexColStart>

      {showDropdown && (
        <div
          ref={dropdownRef}
          className="w-full relative border-[1px] border-gray-102 shadow-md py-4 px-6 mb-[20px] rounded-[8px]"
        >
          <FlexColStart className="w-full border-b-[1px] border-b-white-300 py-1">
            {selectedValue ? (
              <FlexRowCenterBtw className="w-full py-3 mb-2 border-b-[1px] border-b-gray-102/50 ">
                <span>{selectedValue.value}</span>
                <CancelIcon
                  className="cursor-pointer"
                  onClick={handleCancel}
                  width={24}
                  height={24}
                />
              </FlexRowCenterBtw>
            ) : (
              <span className="px-3 font-hnM text-[14px] text-dark-104">
                Select...
              </span>
            )}
          </FlexColStart>
          <div className="w-full h-full max-h-[250px] overflow-y-auto mt-2">
            <ul className="w-full list-none p-0 m-0 ">
              {options?.map((option) => {
                const isSelected = selectedValue?.uuid === option.uuid;
                const isMatchingValue =
                  value.length > 0 &&
                  option.value.toLowerCase().includes(value.toLowerCase());

                if (value.length === 0 || isMatchingValue) {
                  return (
                    <li
                      key={option.uuid}
                      onClick={() => handleSelect(option)}
                      className={cn(
                        "w-full py-[8px] px-3 text-left cursor-pointer leading-[20px] tracking-normal text-dark-103 text-[14px] font-inter font-medium rounded-md ",
                        isSelected
                          ? "bg-blue-200 text-white-100"
                          : "text-dark-106"
                      )}
                    >
                      {option.value}
                    </li>
                  );
                }
                return null;
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Select;
