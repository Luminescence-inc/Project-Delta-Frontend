import React from "react";
import "./style.scss";
import ChevronDown from "assets/icons/chevron-down.svg?react";
import { cn } from "utils";

type Props = {
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  label?: string;
  type?: "multi" | "single";
  listsData?: { uuid: string; value: string }[] | undefined | null;
  selectedListData?:
    | { uuid?: string | undefined; value?: string | undefined }
    | { uuid?: string | undefined; value?: string | undefined }[]
    | undefined
    | null;
  onChange?: (props: { uuid?: string; value?: string; type?: string }) => void;
  onClick?: () => void;
  dataType?: string;
  disableTrigger?: boolean;
  activePanel: string;
  setActivePanel: (panel: string) => void;
  placeholder?: string;
};

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
}: Props) {
  //   const [updatedSelectedListData, setUpdatedSelectedListsData] =
  // React.useState<typeof selectedListData>();
  const [searchValue, setSearchValue] = React.useState("");
  const [filterData, setFilterData] = React.useState<
    { uuid?: string; value?: string }[]
  >(listsData!);

  label = label ?? "Label here..";
  rightIcon = <ChevronDown />;

  const getActiveList = React.useCallback(
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

  const activeSelectedItem =
    selectedListData && !Array.isArray(selectedListData)
      ? selectedListData
      : null;

  return (
    <div className="ntw w-full multisearch-comp flex flex-col items-start justify-start gap-2 relative">
      <label className="ntw text-14 font-normal font-hn-light leading-19">
        {label}
      </label>
      <button
        className={cn(
          "ntw trigger w-full h-46 flex flex-row items-center justify-start p-16 rounded-5 cursor-pointer gap-10",
          disableTrigger ? "disabled" : ""
        )}
        onClick={() => {
          setActivePanel &&
            setActivePanel(activePanel.length > 0 ? "" : dataType!);
          onClick && onClick();
        }}
        // disabled={disableTrigger}
      >
        {leftIcon ?? null}
        <div className="ntw w-full flex items-start justify-start">
          <span
            className={cn(
              "ntw text-10 leading-11 font-normal font-hn-light tracking-2 placeholder",
              typeof activeSelectedItem?.uuid !== "undefined" ? "value" : ""
            )}
          >
            {allowedDataType.includes(dataType!) && selectedListData
              ? activeSelectedItem?.uuid
              : placeholder ?? "Search for businesses"}
          </span>
        </div>
        {rightIcon ?? null}
      </button>

      {/* floating panel */}
      {!disableTrigger && (
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
                          getActiveList(l?.uuid!, dataType!) === l.uuid ?? false
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
                      getActiveList(l.uuid!, dataType!) === l.uuid
                        ? "active"
                        : ""
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
      )}
    </div>
  );
}
