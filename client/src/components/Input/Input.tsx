/** @format */

import React from 'react';
import './Input.scss';

interface IInput {
  label: string;
  icon?: React.ReactNode;
  placeholder: string;
  type: string;
}

const Input = ({ label, type, icon, placeholder }: IInput) => {
  return (
    <div className='form-group'>
      <label htmlFor=''>{label}</label>
      <div className='input-wrapper'>
        <input type={type} placeholder={placeholder} />
        {icon}
      </div>
    </div>
  );
};

export default Input;
