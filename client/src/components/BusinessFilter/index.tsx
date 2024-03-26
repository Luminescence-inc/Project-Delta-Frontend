import React from "react";
import "./style.scss";
import { X } from "lucide-react";
import MultiSearch from "./MultiSearch";

const listsData = [
  { uuid: "1", value: "Agriculture" },
  { uuid: "2", value: "Tech" },
  { uuid: "3", value: "Fashion" },
  { uuid: "4", value: "Health" },
  { uuid: "5", value: "Education" },
];

type FilterData = {
  businessCategory: { uuid: string }[] | undefined;
  stateAndProvince: string | undefined;
  city: string | undefined;
  country: string | undefined;
};

type OnfilterDataProps = {
  uuid?: string | undefined;
  value?: string | undefined;
  type?: string | undefined;
};

export default function BusinessesFilterComponent() {
  const [filterData, setFilterData] = React.useState<FilterData>({
    businessCategory: undefined,
    stateAndProvince: undefined,
    city: undefined,
    country: undefined,
  });

  const onFilter = ({ uuid, value, type }: OnfilterDataProps) => {
    if (type === "businessCategory") {
      const valueExists = filterData.businessCategory?.find(
        (item) => item.uuid === uuid
      );
      if (valueExists) {
        // remove the value
        const updatedValue = filterData.businessCategory?.filter(
          (item) => item.uuid !== uuid
        );
        setFilterData({
          ...filterData,
          businessCategory: updatedValue!.length > 0 ? updatedValue : undefined,
        });
      } else {
        // add the value
        const updatedValue = filterData.businessCategory
          ? [...filterData.businessCategory, { uuid: uuid! }]
          : [{ uuid: uuid! }];
        setFilterData({
          ...filterData,
          businessCategory: updatedValue,
        });
      }
    }
  };

  return (
    <div className="ntw filter-container">
      <div className="ntw w-full h-auto flex flex-col items-start justify-start px-20 py-20 filter-card">
        <div className="ntw w-full header flex flex-row items-center justify-between ">
          <h2 className="ntw text-30 font-bold">Search</h2>
          <button className="ntw close-btn border-none outline-none">
            <X size={25} />
          </button>
        </div>

        {/* body */}
        <div className="ntw w-full h-auto mt-40 body">
          <MultiSearch
            label="Business Category"
            type={"multi"}
            listsData={listsData}
            selectedListData={filterData?.businessCategory}
            dataType="businessCategory"
            onChange={({ type, uuid, value }) =>
              onFilter({ type, uuid, value })
            }
          />
        </div>
      </div>
    </div>
  );
}
