"use client";
import React, { useRef } from "react";
import type { IOption } from "@/types/business";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "./icons";
import { FlexRowStartBtw } from "./Flex";
import { useEffect, useState } from "react";
import type { FormikProps } from "formik";

interface MultiSelectProps {
  label: string;
  name: string;
  formik: FormikProps<any>;
  options: IOption[] | undefined;
  placeholder: string;
  formikValue?: IOption[];
}

export default function NMultiSelect({
  label,
  options,
  name,
  formik,
  placeholder,
  formikValue,
}: MultiSelectProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedValues, setSelectedValues] = useState<IOption[]>(
    formikValue || []
  );
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setSelectedValues(formikValue || []);
  }, [formikValue]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSelect = (option: IOption) => {
    const isSelected = selectedValues.some((val) => val.uuid === option.uuid);
    let updatedValues: IOption[] = [];

    if (isSelected) {
      updatedValues = selectedValues.filter((val) => val.uuid !== option.uuid);
    } else {
      updatedValues = [...selectedValues, option];
    }

    setSelectedValues(updatedValues);
    updateFormikValues(updatedValues);
  };

  const updateFormikValues = (values: IOption[]) => {
    formik.setFieldValue(
      name,
      values.map((val) => val.value)
    );
  };

  const isSelected = (option: IOption) => {
    return selectedValues.some((val) => val.uuid === option.uuid);
  };

  const handleSave = () => {
    setShowDropdown(false);
  };

  return (
    <Popover>
      <PopoverTrigger className="w-full h-[46px] disabled:bg-white-106 disabled:cursor-not-allowed border-[1px] border-solid border-white-200 bg-none text-xs font-pp px-3 py-1 rounded-md">
        <FlexRowStartBtw className="w-full">
          <span>{placeholder}</span>
          <ChevronDown size={20} color="#000" className="stroke-dark-100" />
        </FlexRowStartBtw>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <div className="w-[380px]">
          <input
            type="text"
            className="w-full px-[3px] py-[2px] text-sm border-b-[1px] bordcer-b-solid border-b-white-40 outline-none font-pp"
            placeholder="Search..."
            defaultValue={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            autoFocus
          />
          {options
            ?.filter(
              (option) =>
                searchValue.length === 0 ||
                option.value.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((option) => (
              <button
                className="flex flex-row items-center justify-end gap-3"
                key={option.uuid}
                onClick={() => handleSelect(option)}
              >
                <input type="checkbox" checked={isSelected(option)} />
                <span>{option.value}</span>
              </button>
            ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
