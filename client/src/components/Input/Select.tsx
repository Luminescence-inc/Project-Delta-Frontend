/** @format */

import { useRef, useState, useEffect } from "react";
import ArrowUpIcon from "assets/icons/arrow-up.svg?react";
import CancelIcon from "assets/icons/cancel-select-icon.svg?react";
import "./Input.scss";
import { FormikProps } from "formik";

interface ISelect {
  label: string;
  name: string;
  formikValue: string | undefined;
  formik: FormikProps<any>;
  options: IOption[] | undefined;
  placeholder: string;
}

interface IOption {
  uuid: string;
  value: string;
}

const Select = ({ label, options, name, formikValue, formik }: ISelect) => {
  //Based on the values(string) find the corresponding option (object)
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(formikValue || "");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedValue, setSelectedValue] = useState<IOption | null>(null);

  useEffect(() => {
    if (formikValue) {
      setValue(formikValue);
    }
  }, [formikValue]);

  const handleSelect = (option: IOption) => {
    setSelectedValue(option);
    setValue(option.value);
    setShowDropdown(false);

    formik.setFieldValue(`${name}`, option.value);
  };

  const handleCancel = () => {
    setSelectedValue(null);
    setValue("");

    formik.setFieldValue(`${name}`, "");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  //Inline style
  const selectedStyle = {
    color: "#FFFFFF",
    backgroundColor: "#0E2D52",
    borderRadius: "4px",
  };

  return (
    <>
      <div className="form-group">
        <label htmlFor="">{label}</label>
        <div className="input-wrapper">
          <input
            className="select"
            type="text"
            name={name}
            placeholder={label}
            value={value}
            onClick={toggleDropdown}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <ArrowUpIcon
            className="arrow-down input-icon"
            width={14}
            height={14}
          />
        </div>
      </div>

      {showDropdown && (
        <div ref={dropdownRef} className="dropdown-container">
          <div className="selected-value">
            {selectedValue ? (
              <div className="selected-item">
                <span>{selectedValue.value}</span>
                <CancelIcon
                  className="input-icon"
                  onClick={handleCancel}
                  width={24}
                  height={24}
                />
              </div>
            ) : (
              <span>Select...</span>
            )}
          </div>
          <div className="options-list">
            <ul>

              {options?.map((option) => {
                const isSelected = selectedValue?.uuid === option.uuid;
                const isMatchingValue = value.length > 0 && option.value.toLowerCase().includes(value.toLowerCase());

                if (value.length === 0 || isMatchingValue) {
                  return (
                    <li
                      key={option.uuid}
                      onClick={() => handleSelect(option)}
                      style={isSelected ? selectedStyle : {}}
                    >
                      {option.value}
                    </li>
                  );
                }

                return null;
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Select;
