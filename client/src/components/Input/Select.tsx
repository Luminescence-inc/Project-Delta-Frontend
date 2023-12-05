/** @format */

import './Input.scss';

interface ISelect {
  label: string;
  options: string[];
}

const Select = ({ label, options }: ISelect) => {
  return (
    <div className='form-group'>
      <label htmlFor=''>{label}</label>
      <select>
        {options.map((option, i) => (
          <option key={i}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;
