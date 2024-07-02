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
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

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
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [filterData, setFilterData] = useState<
    { uuid?: string; value?: string }[]
  >(listsData!);

  useEffect(() => {
    if (searchValue.length > 0) {
      const searchResult = listsData?.filter((data) =>
        data.value.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilterData(searchResult!);
    } else {
      setFilterData(listsData!);
    }
  }, [searchValue]);

  useEffect(() => {
    setFilterData(listsData!);
  }, [listsData]);

  // array of allowed dataType that need to be shown on select input
  const allowedDataType = ["country", "stateAndProvince", "city"];

  const activeSelectedItem =
    selectedListData && !Array.isArray(selectedListData)
      ? selectedListData
      : null;

  return (
    <FlexColStart className="w-full">
      <span className="text-[14px] font-semibold font-pp text-dark-100/60">
        {label}
      </span>
      <Select
        onValueChange={(id) => {
          const value = listsData?.find((list) => list.uuid === id)?.value;
          onChange?.({
            uuid: id,
            value,
            type: dataType as BusinessFilterType,
          });
          if (is_link) {
            const params = new URLSearchParams(window.location.search);
            params.delete("cat");
            params.set("cat", encodeURI(value!));

            const url = `${location.pathname}?${params.toString()}`;
            router.push(url);
          }
        }}
      >
        <SelectTrigger
          className="w-full h-[46px] disabled:bg-white-106 disabled:cursor-not-allowed border-[1px] border-solid border-white-200 bg-none text-xs font-pp"
          rightIcon={
            <ChevronDown size={20} color="#000" className="stroke-dark-100" />
          }
          // disabled={true}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <FlexColStart className="px-3 pt-4">
            <input
              type="text"
              className="w-full px-[3px] py-[2px] text-sm border-b-[1px] bordcer-b-solid border-b-white-40 outline-none font-pp"
              placeholder="Search..."
              defaultValue={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              autoFocus
            />
            {filterData && filterData.length > 0 ? (
              filterData?.map((d) => {
                if (is_link) {
                  return (
                    <SelectItem
                      key={d.uuid}
                      value={d.uuid!}
                      className=" hover:bg-white-400/30 cursor-pointer"
                    >
                      {d.value}
                    </SelectItem>
                  );
                  // filterData && filterData.length > 0 ? (
                  //   filterData.map((d) => {

                  //   })
                  // ) : (
                  //   <span className="text-xs font-pp text-white-400">
                  //     No data found
                  //   </span>
                  // );
                } else {
                  return (
                    <SelectItem
                      key={d.uuid}
                      value={d.uuid!}
                      className=" hover:bg-white-400/30 cursor-pointer"
                    >
                      {d.value}
                    </SelectItem>
                  );
                }
              })
            ) : (
              <span className="text-xs font-pp text-white-400">
                No data found
              </span>
            )}
          </FlexColStart>
        </SelectContent>
      </Select>
    </FlexColStart>
  );
}
