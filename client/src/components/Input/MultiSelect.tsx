import { useRef, useState, useEffect } from "react";
import ArrowUpIcon from "assets/icons/arrow-up.svg?react";
import { FormikProps } from "formik";
import Button from "components/Button/Button";
import "./Input.scss";
import SelectedPlaceholder from "components/SelectedPlaceholder";
import { FlexColStart, FlexRowCenter } from "components/Flex";
import { cn } from "utils";

interface ISelect {
  label: string;
  name: string;
  formik: FormikProps<any>;
  options: IOption[] | undefined;
  placeholder: string;
  formikValue?: IOption[];
}

interface IOption {
  uuid: string;
  value: string;
}

const MultiSelect = ({
  label,
  options,
  name,
  formik,
  formikValue,
}: ISelect) => {
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
    <>
      <FlexColStart className="w-full">
        <label className="text-[14px] font-inter font-semibold text-dark-100/60">
          {label}
        </label>
        <FlexRowCenter className="w-full relative">
          <input
            className={cn(
              "w-full h-[46px] border-[1px] border-solid border-dark-103 tracking-[2px] text-[12px] text-blue-200 p-[16px] rounded-[5px] placeholder:text-dark-104 placeholder:text-[12px]",
              showDropdown ? "cursor-text" : "cursor-pointer"
            )}
            type="text"
            name={name}
            placeholder={label}
            onClick={toggleDropdown}
            readOnly
          />
          <ArrowUpIcon
            className={cn(
              "absolute top-[15px] right-[20px]",
              "-rotate-[180deg]"
            )}
            width={14}
            height={14}
          />
        </FlexRowCenter>
        {/* Days of operation placeholders */}
        <SelectedPlaceholder
          selectedValues={selectedValues}
          getSelectedHoler={(id: string) => {
            const updatedValues = selectedValues.filter(
              (val) => val.uuid !== id
            );
            setSelectedValues(updatedValues);
            updateFormikValues(updatedValues);
          }}
          visible={showDropdown}
          type={name}
        />
      </FlexColStart>

      {showDropdown && (
        <div ref={dropdownRef} className="dropdown-container">
          <input
            type="text"
            className="multiselect-search-inp"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div className="options-list">
            <ul>
              {options
                ?.filter(
                  (option) =>
                    searchValue.length === 0 ||
                    option.value
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
                )
                .map((option) => (
                  <ListComponent
                    key={option.uuid}
                    option={option}
                    isSelected={isSelected}
                    handleSelect={handleSelect}
                  />
                ))}
            </ul>
          </div>
          <div style={{ paddingTop: "10px" }}>
            <Button
              onClick={handleSave}
              label="Save"
              variant="primary"
              size="md"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MultiSelect;

type ListComponentProps = {
  option: {
    uuid: string;
    value: string;
  };
  handleSelect: (option: any) => void;
  isSelected: (option: any) => boolean;
};

function ListComponent({
  option,
  isSelected,
  handleSelect,
}: ListComponentProps) {
  return (
    <li
      key={option.uuid}
      onClick={() => handleSelect(option)}
      style={{ listStyleType: "none", display: "flex" }}
    >
      <input type="checkbox" checked={isSelected(option)} onChange={() => {}} />
      <label className="checkbox-value">{option.value}</label>
    </li>
  );
}
