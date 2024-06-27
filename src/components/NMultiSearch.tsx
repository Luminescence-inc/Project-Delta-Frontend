"use client";
import React from "react";
import type { BusinessFilterType, MultiSearchType } from "@/types/business";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown } from "./icons";
import { FlexColStart } from "./Flex";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface MultiSearchProps {
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  label?: string;
  type?: MultiSearchType;
  is_link?: boolean;
  listsData?: { uuid: string; value: string }[] | undefined | null;
  selectedListData?:
    | { uuid?: string | undefined; value?: string | undefined }
    | { uuid?: string | undefined; value?: string | undefined }[]
    | undefined
    | null;
  onChange?: (props: {
    uuid?: string;
    value?: string;
    type?: BusinessFilterType;
  }) => void;
  onClick?: () => void;
  dataType?: string;
  disableTrigger?: boolean;
  activePanel: string;
  setActivePanel: (panel: string) => void;
  placeholder?: string;
}

export default function NMultiSearch({
  rightIcon,
  leftIcon,
  label,
  type,
  listsData,
  selectedListData,
  onChange,
  dataType,
  disableTrigger,
  activePanel,
  setActivePanel,
  placeholder,
  onClick,
  is_link,
}: MultiSearchProps) {
  const router = useRouter();
  return (
    <Select
      onValueChange={(id) => {
        const value = listsData?.find((list) => list.uuid === id)?.value;
        const params = new URLSearchParams(window.location.search);
        params.delete("cat");
        params.set("cat", encodeURI(value!));

        const url = `${location.pathname}?${params.toString()}`;

        router.push(url);
      }}
    >
      <SelectTrigger className="w-full" rightIcon={<ChevronDown size={15} />}>
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <FlexColStart className="px-3 pt-4">
          <input
            type="text"
            className="w-full px-[3px] py-[2px] text-sm border-b-[1px] bordcer-b-solid border-b-white-40 outline-none font-os"
            placeholder="Search..."
            //   value={searchValue}
            //   onChange={(e) => setSearchValue(e.target.value)}
          />
          {listsData?.map((list) => {
            if (is_link) {
              return (
                <SelectItem
                  key={list.uuid}
                  value={list.uuid}
                  className=" hover:bg-white-400/30 cursor-pointer"
                >
                  {list.value}
                </SelectItem>
              );
            } else {
              return (
                <SelectItem
                  key={list.uuid}
                  value={list.uuid}
                  className=" hover:bg-white-400/30 cursor-pointer"
                >
                  {list.value}
                </SelectItem>
              );
            }
          })}
        </FlexColStart>
      </SelectContent>
    </Select>
  );
}
