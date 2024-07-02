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
import { ChevronDown, X } from "./icons";
import { FlexColStart, FlexRowStartBtw } from "./Flex";
import { useEffect, useState } from "react";
import type { FormikProps } from "formik";
import { cn } from "@/lib/utils";

interface SelectProps {
  label: string;
  name: string;
  formik: FormikProps<any>;
  options: IOption[] | undefined;
  placeholder: string;
  formikValue?: IOption[];
}

export default function NSelect({
  label,
  options,
  name,
  formik,
  formikValue,
  placeholder,
}: SelectProps) {
  const [value, setValue] = useState(formikValue || "");
  const [selectedValue, setSelectedValue] = useState<IOption | null>(null);

  useEffect(() => {
    if (formikValue) {
      setValue(formikValue);
    }
  }, [formikValue]);

  const handleCancel = () => {
    setSelectedValue(null);
    setValue("");

    formik.setFieldValue(`${name}`, "");
  };

  return (
    <FlexColStart classID="w-full">
      <span className="text-[14px] font-semibold font-pp text-dark-100/60">
        {label}
      </span>
      <Select
        onValueChange={(id) => {
          const option = options?.find((option) => option.uuid === id);
          setSelectedValue(option!);
          setValue(option?.value!);
          //!  formik.setFieldValue(`${name}`, option?.value!);
        }}
      >
        <SelectTrigger className="w-full h-[46px] disabled:bg-white-106 disabled:cursor-not-allowed border-[1px] border-solid border-white-200 bg-none text-xs font-pp px-3 py-1 rounded-md">
          <FlexRowStartBtw className="w-full">
            <span className="mt-1">{placeholder}</span>
            <ChevronDown size={20} color="#000" className="stroke-dark-100" />
          </FlexRowStartBtw>
        </SelectTrigger>
        <SelectContent className="w-full max-h-[350px] overflow-y-auto py-2">
          {selectedValue && (
            <FlexRowStartBtw className="w-full py-2 border-b-[1px] bordcer-b-solid border-b-white-40 mb-2">
              <span className="font-pp text-sm text-dark-100">
                {selectedValue.value}
              </span>
              <button className="text-xs font-pp" onClick={handleCancel}>
                <X
                  size={18}
                  strokeWidth={3}
                  color="#000"
                  className="stroke-dark-100"
                />
              </button>
            </FlexRowStartBtw>
          )}
          {options?.map((option) => {
            const isSelected = selectedValue?.uuid === option.uuid;
            const isMatchingValue =
              value.length > 0 &&
              option.value.toLowerCase().includes(value?.toLowerCase());

            return (
              <SelectItem
                className={cn(
                  "hover:bg-blue-200 hover:text-white-100 text-left cursor-pointer leading-[20px] tracking-normal text-dark-103 text-[14px] font-inter font-medium rounded-md",
                  isSelected ? "bg-blue-200 text-white-100" : "text-dark-106"
                )}
                key={option.uuid}
                value={option.uuid}
              >
                <span>{option.value}</span>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </FlexColStart>
  );
}
