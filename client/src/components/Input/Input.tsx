/** @format */

import React from 'react';
import './Input.scss';

interface IInput {
  label?: string;
  icon?: React.ReactNode;
  placeholder: string;
  type: string;
  name?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>)=> void
  onBlur?: (e: React.FocusEvent<any, Element>)=> void
}

const Input = ({ label, type, icon, placeholder, name, value, disabled, onChange, onBlur }: IInput) => {
  return (
    <div className='form-group'>
      <label htmlFor=''>{label}</label>
      <div className='input-wrapper'>
        <input name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} onBlur={onBlur} disabled={disabled?disabled:false} />
        {icon}
      </div>
    </div>
  );
};

export default Input;
