import { useRef, useState } from 'react';
import ArrowUpIcon from 'assets/icons/arrow-up.svg?react';
import { FormikProps } from 'formik';
import Button from 'components/Button/Button';
import './Input.scss';

interface ISelect {
  label: string;
  name: string;
  formik: FormikProps<any>;
  options: IOption[] | undefined;
  placeholder: string;
}

interface IOption {
  uuid: string;
  value: string;
}

const MultiSelect = ({ label, options, name, formik }: ISelect) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedValues, setSelectedValues] = useState<IOption[]>([]);

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
    const selectedValueStrings = values.map((val) => val.value);
    formik.setFieldValue(name, selectedValueStrings);
  };

  const isSelected = (option: IOption) => {
    return selectedValues.some((val) => val.uuid === option.uuid);
  };

  const handleSave = () => {
    setShowDropdown(false);
  };

  return (
    <>
      <div className='form-group'>
        <label htmlFor=''>{label}</label>
        <div className='input-wrapper'>
          <input
            className='select'
            type='text'
            name={name}
            placeholder={label}
            onClick={toggleDropdown}
            readOnly
          />
          <ArrowUpIcon className='arrow-down input-icon' width={14} height={14} />
        </div>
      </div>

      {showDropdown && (
        <div ref={dropdownRef} className='dropdown-container'>
          <div className='options-list'>
            <ul>
              {options?.map((option) => (
                <li key={option.uuid} style={{ listStyleType: 'none', display: 'flex' }}>
                  <input 
                      type='checkbox'
                      checked={isSelected(option)}
                      onChange={() => handleSelect(option)}
                    />
                  <label className='checkbox-value'>
                    {option.value}
                  </label>
                </li>
              ))}
            </ul>    
          </div>
          <div style={{paddingTop: "10px"}}>
          <Button onClick={handleSave} label='Save' variant='primary' size='md' />
          </div>
        </div>
      )}
    </>
  );
};

export default MultiSelect;
