/** @format */

import { Link } from 'react-router-dom';

import './Button.scss';

interface IButton {
  label: string;
  variant?: 'primary' | 'transparent' | 'default';
  size?: 'md' | 'lg';
  to?: string;
  onClick?: () => void;
}

const Button = ({
  label,
  variant = 'default',
  size = 'md',
  to = '',
  onClick,
}: IButton) => {
  const ButtonComponent = to ? Link : 'button';
  return (
    <ButtonComponent
      className={`btn btn-${variant} btn-${size}`}
      to={to}
      onClick={onClick}
    >
      {label}
    </ButtonComponent>
  );
};

export default Button;
