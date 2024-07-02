"use client";
import { X } from "@components/icons";
import { FlexRowStart, FlexRowStartCenter } from "./Flex";

type Props = {
  selectedValues: {
    uuid: string;
    value: string;
  }[];
  visible: boolean;
  getSelectedHoler: (id: string) => void;
  type: "daysOfOperation" | "businessCategory" | string;
};

export default function SelectedPlaceholder({
  selectedValues,
  getSelectedHoler,
  visible,
  type,
}: Props) {
  if (!selectedValues) return null;

  return (
    <>
      {selectedValues.length > 0 && !visible && (
        <FlexRowStart className="">
          {selectedValues.map((d) => (
            <FlexRowStartCenter
              key={d.uuid}
              className="w-auto px-[10px] py-[7px] bg-gray-201 rounded-full"
            >
              <span className="text-[11px] font-inter tracking-normal leading-[13px] font-semibold text-blue-200 ml-[5px]">
                {type === "daysOfOperation" ? d.value.slice(0, 3) : d.value}
              </span>
              <button
                className="flex items-center justify-start border-none outline-none cursor-pointer transition-all p-0 m-0"
                onClick={() => {
                  getSelectedHoler(d.uuid);
                }}
              >
                <X size={15} className="text-[5px] text-gray-100" />
              </button>
            </FlexRowStartCenter>
          ))}
        </FlexRowStart>
      )}
    </>
  );
}
