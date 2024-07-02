"use client";
import React, { useRef } from "react";
import type { IOption } from "@/types/business";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown } from "./icons";
import { FlexColStart, FlexRowStartBtw } from "./Flex";
import { useEffect, useState } from "react";
import type { FormikProps } from "formik";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";

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
    <FlexColStart className="w-full">
      <span className="text-[14px] font-semibold font-pp text-dark-100/60">
        {label}
      </span>
      <Select>
        <SelectTrigger className="w-full max-w-[400px] h-[46px] disabled:bg-white-106 disabled:cursor-not-allowed border-[1px] border-solid border-white-200 bg-none text-xs font-pp px-3 py-1 rounded-md">
          <FlexRowStartBtw className="w-full">
            <span className="mt-1">{placeholder}</span>
            <ChevronDown size={20} color="#000" className="stroke-dark-100" />
          </FlexRowStartBtw>
        </SelectTrigger>
        <SelectContent
          sideOffset={5}
          className="w-full max-w-[400px] max-h-[300px] overflow-y-auto"
        >
          <div className="w-full px-2">
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
                <button className="w-full cursor-pointer">
                  <SelectItem
                    className="w-full flex flex-row items-start justify-start gap-3 cursor-pointer"
                    key={option.uuid}
                    value={option.uuid!}
                    // onClick={() => handleSelect(option)}
                  >
                    <input
                      type="checkbox"
                      className="mt-3 mr-1"
                      checked={isSelected(option)}
                    />
                    <span>{option.value}</span>
                  </SelectItem>
                </button>
              ))}
          </div>
        </SelectContent>
      </Select>
    </FlexColStart>
  );
}
