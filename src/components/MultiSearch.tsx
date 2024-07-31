"use client";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "@components/icons";
import { BusinessFilterType, MultiSearchType } from "@/types/business";
import { FlexColStart, FlexRowStart } from "@components/Flex";

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

export default function MultiSearch({
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
  const [search, setSearch] = useState("");
  //   const location = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const [filterData, setFilterData] = useState<
    { uuid?: string; value?: string }[]
  >(listsData!);

  label = label ?? "Label here..";
  rightIcon = <ChevronDown />;

  const getActiveList = useCallback(
    (uuid: string, type: string) => {
      if (type === "businessCategory") {
        return Array.isArray(selectedListData)
          ? selectedListData.find((data) => data.uuid === uuid)?.uuid
          : null;
      }
      return !Array.isArray(selectedListData)
        ? selectedListData?.uuid === uuid
          ? selectedListData.uuid
          : null
        : null;
    },
    [selectedListData]
  );

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
    <FlexColStart className="w-full gap-2 relative pb-[20px]">
      <label className="text-sm font-normal font-inter leading-[19px] text-blue-200">
        {label}
      </label>
      <button
        className={cn(
          "w-full h-[46px] flex flex-row items-center justify-start p-[16px] rounded-[5px] cursor-pointer gap-[10px] border-[1px] border-solid border-white-200 bg-none",
          disableTrigger ? "bg-white-106 cursor-not-allowed" : ""
        )}
        onClick={() => {
          setActivePanel &&
            setActivePanel(activePanel.length > 0 ? "" : dataType!);
          onClick && onClick();
        }}
      >
        {leftIcon ?? null}
        <FlexRowStart className="w-full">
          <span
            className={cn(
              "text-[10px] leading-[11px] font-semibold font-inter tracking-[1px] text-dark-104",
              typeof activeSelectedItem?.uuid !== "undefined"
                ? "text-dark-100"
                : ""
            )}
          >
            {allowedDataType.includes(dataType!) && selectedListData
              ? activeSelectedItem?.uuid
              : placeholder ?? "Search..."}
          </span>
        </FlexRowStart>
        {rightIcon ?? null}
      </button>

      {/* floating panel */}
      {!disableTrigger && (
        <FlexColStart
          className={cn(
            "w-full h-auto absolute top-[90px] rounded-[10px] drop-shadow-lg shadow-lg bg-white-100 z-[100] overflow-hidden",
            activePanel === dataType ? "py-[20px] px-[20px]" : ""
          )}
          style={{
            maxHeight: "250px",
            overflowY: "auto",
            height: activePanel === dataType ? "auto" : "0px",
          }}
        >
          <input
            type="text"
            className="w-full px-[3px] py-[2px] text-[15px] border-b-[1px] bordcer-b-solid border-b-white-40 outline-none"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {/* lists */}
          <FlexColStart className="w-full flex flex-col items-start justify-start gap-[5px]">
            {type === "multi"
              ? filterData && filterData.length > 0
                ? filterData.map((listData) => (
                    <RenderButtonOrLink
                      key={listData.uuid}
                      type={type!}
                      value={{
                        uuid: listData.uuid!,
                        text: listData.value!,
                      }}
                      checked={
                        getActiveList(listData.uuid!, dataType!) ===
                        listData.uuid
                      }
                      isActive={
                        getActiveList(listData.uuid!, dataType!) ===
                        listData.uuid
                      }
                      onChange={() => {
                        onChange?.({
                          uuid: listData.uuid,
                          value: listData.value,
                          type: dataType as BusinessFilterType,
                        });
                      }}
                    />
                  ))
                : null
              : filterData && filterData.length > 0
              ? filterData.map((listData) => {
                  if (is_link) {
                    const params = new URLSearchParams(search);
                    params.delete("cat");
                    params.set("cat", encodeURI(listData.value!));

                    const url = `${location.pathname}?${params.toString()}`;

                    return (
                      <RenderButtonOrLink
                        key={listData.uuid}
                        type={type!}
                        url={url}
                        value={{
                          uuid: listData.uuid!,
                          text: listData.value!,
                        }}
                        checked={
                          getActiveList(listData.uuid!, dataType!) ===
                          listData.uuid
                        }
                        isActive={
                          getActiveList(listData.uuid!, dataType!) ===
                          listData.uuid
                        }
                        onChange={() => {
                          // close panel
                          onChange?.({
                            uuid: listData.uuid,
                            value: listData.value,
                            type: dataType as BusinessFilterType,
                          });
                          setActivePanel("");
                        }}
                        is_link={true}
                      />
                    );
                  }
                  return (
                    <RenderButtonOrLink
                      key={listData.uuid}
                      type={type!}
                      value={{
                        uuid: listData.uuid!,
                        text: listData.value!,
                      }}
                      checked={
                        getActiveList(listData.uuid!, dataType!) ===
                        listData.uuid
                      }
                      isActive={
                        getActiveList(listData.uuid!, dataType!) ===
                        listData.uuid
                      }
                      onChange={() => {
                        // close panel
                        onChange?.({
                          uuid: listData.uuid,
                          value: listData.value,
                          type: dataType as BusinessFilterType,
                        });
                        setActivePanel("");
                      }}
                    />
                  );
                })
              : null}
          </FlexColStart>
        </FlexColStart>
      )}
    </FlexColStart>
  );
}

interface RenderProps {
  type: MultiSearchType;
  onChange: () => void;
  checked: boolean;
  isActive: boolean;
  is_link?: boolean;
  url?: string;
  value: {
    uuid: string;
    text: string;
  };
}

const RenderButtonOrLink = ({
  type,
  value,
  checked,
  isActive,
  onChange,
  is_link,
  url,
}: RenderProps) => {
  return type === "multi" ? (
    <button
      className="flex items-center justify-start gap-[10px] outline-none border-none bg-none cursor-pointer"
      onClick={onChange}
    >
      <input
        type="checkbox"
        name=""
        id=""
        value={value.uuid}
        checked={checked}
        onChange={onChange}
      />
      <span className="text-[15px] font-normal text-white-400 font-inter">
        {value.text}
      </span>
    </button>
  ) : is_link ? (
    <a
      href={url!}
      className={cn(
        "w-full flex items-center justify-start gap-[2px] border-none outline-none px-[10px] py-[5px] rounded-[5px] cursor-pointer",
        isActive ? "bg-blue-200 text-white-100" : "text-white-400"
      )}
      onClick={onChange}
    >
      <span className="text-[15px] font-medium font-inter mt-[2px]">
        {value.text}
      </span>
    </a>
  ) : (
    <button
      className={cn(
        "w-full flex items-center justify-start gap-[2px] border-none outline-none px-[10px] py-[5px] rounded-[5px] cursor-pointer",
        isActive ? "bg-blue-200 text-white-100" : "text-white-400"
      )}
      onClick={onChange}
    >
      <span className="text-[15px] font-medium font-inter mt-[2px]">
        {value.text}
      </span>
    </button>
  );
};
