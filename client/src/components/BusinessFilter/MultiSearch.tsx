import React from "react";
import "./style.scss";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "utils";

type Props = {
  rightIcon?: React.ReactNode;
  includeRightIcon?: boolean;
  includeLeftIcon?: boolean;
  leftIcon?: React.ReactNode;
  label?: string;
  type?: "multi" | "single";
  listsData?: { uuid: string; value: string }[];
  selectedListData?:
    | { uuid?: string | undefined; value?: string | undefined }
    | undefined;
  onChange?: (props: { uuid?: string; value?: string; type?: string }) => void;
  dataType?: string;
  disableTrigger?: boolean;
  activePanel: string;
  setActivePanel: (panel: string) => void;
  placeholder?: string;
};

export default function MultiSearch({
  rightIcon,
  includeLeftIcon,
  includeRightIcon,
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
}: Props) {
  //   const [updatedSelectedListData, setUpdatedSelectedListsData] =
  // React.useState<typeof selectedListData>();
  const [searchValue, setSearchValue] = React.useState("");
  const [filterData, setFilterData] = React.useState<
    { uuid?: string; value?: string }[]
  >(listsData!);

  label = label ?? "Label here..";
  includeRightIcon = true;
  rightIcon = <ChevronDown size={25} color="#777" />;

  const getActiveList = (uuid: string) => {
    return selectedListData?.uuid === uuid ? selectedListData : null;
  };

  React.useEffect(() => {
    if (searchValue.length > 0) {
      const searchResult = listsData?.filter((data) =>
        data.value.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilterData(searchResult!);
    } else {
      setFilterData(listsData!);
    }
  }, [searchValue]);

  React.useEffect(() => {
    setFilterData(listsData!);
  }, [listsData]);

  // array of allowed dataType that need to be shown on select input
  const allowedDataType = ["country", "stateAndProvince", "city"];

  return (
    <div className="ntw w-full multisearch-comp flex flex-col items-start justify-start gap-2 relative">
      <label className="ntw text-15 font-normal">{label}</label>
      <button
        className={cn(
          "ntw trigger  w-full flex flex-row items-start justify-start px-15 py-12 rounded-5 cursor-pointer gap-2",
          disableTrigger ? "disabled" : ""
        )}
        onClick={() =>
          setActivePanel &&
          setActivePanel(activePanel.length > 0 ? "" : dataType!)
        }
        disabled={disableTrigger}
      >
        {includeLeftIcon && (leftIcon ?? null)}
        <div className="ntw w-full flex items-start justify-start">
          <span
            className={cn(
              "ntw text-15 py-4 placeholder",
              selectedListData!?.uuid ? "value" : ""
            )}
          >
            {allowedDataType.includes(dataType!) && selectedListData
              ? selectedListData!?.uuid
              : placeholder ?? "Search for businesses"}
          </span>
        </div>
        {includeRightIcon && (rightIcon ?? null)}
      </button>

      {/* floating panel */}
      <div
        className={cn(
          "ntw w-full h-auto floating-panel flex flex-col items-start justify-start absolute top-90 rounded-10",
          activePanel === dataType ? "py-20 px-20" : ""
        )}
        style={{
          maxHeight: "250px",
          overflowY: "auto",
          height: activePanel === dataType ? "auto" : "0px",
        }}
      >
        <input
          type="text"
          className="ntw w-full px-3 py-2 outline-none border-none text-15"
          placeholder="Search for businesses"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <br />
        {/* lists */}
        <div className="ntw w-full flex flex-col items-start justify-start gap-2">
          {type === "multi"
            ? filterData && filterData.length > 0
              ? filterData.map((l) => (
                  <li
                    className="ntw flex items-center justify-start gap-2"
                    key={l.uuid}
                  >
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      value={l.uuid}
                      checked={
                        getActiveList(l?.uuid!)?.uuid === l.uuid ?? false
                      }
                      onChange={() => {
                        onChange?.({
                          uuid: l.uuid,
                          value: l.value,
                          type: dataType,
                        });
                      }}
                    />
                    <span className="ntw text-15 font-normal">{l.value}</span>
                  </li>
                ))
              : null
            : filterData && filterData.length > 0
            ? filterData.map((l) => (
                <button
                  key={l.uuid}
                  className={cn(
                    "ntw single-list w-full flex items-center justify-start gap-2 border-none outline-none px-10 py-5 rounded-5 cursor-pointer",
                    getActiveList(l.uuid!)?.uuid === l.uuid ? "active" : ""
                  )}
                  onClick={() => {
                    // close panel
                    onChange?.({
                      uuid: l.uuid,
                      value: l.value,
                      type: dataType,
                    });
                    setActivePanel("");
                  }}
                >
                  <span className="ntw text-15 font-normal">{l.value}</span>
                </button>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
