/** @format */

import React from 'react';
import './Pill.scss';

interface IPill {
  icon: React.ReactNode;
  title: string;
  variant: 'pink' | 'red' | 'green';
}

const Pill = ({ icon, title, variant }: IPill) => {
  return (
    <div className={`pill pill-${variant}`}>
      {icon}
      <h3>{title}</h3>
    </div>
  );
};

export default Pill;
