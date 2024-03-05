/** @format */

import React from 'react';
import './Pill.scss';

interface IPill {
  icon: React.ReactNode;
  title: string;
  variant: 'pink' | 'red' | 'green';
  onClick?: () => void
}

const Pill = ({ icon, title, variant, onClick }: IPill) => {
  return (
    <div className={`pill pill-${variant}`} onClick={onClick}>
      {icon}
      <h3>{title}</h3>
    </div>
  );
};

export default Pill;
