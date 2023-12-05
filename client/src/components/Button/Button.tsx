/** @format */

import { Link } from 'react-router-dom';

import './Button.scss';

interface IButton {
  label: string;
  variant?: 'primary' | 'transparent' | 'default';
  size?: 'md' | 'lg';
  to?: string;
  onClick?: () => void;
  icon?: JSX.Element;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
}

const Button = ({
  label,
  variant = 'default',
  size = 'md',
  to = '',
  onClick,
  icon,
  className,
  type
}: IButton) => {
  const ButtonComponent = to ? Link : 'button';
  return (
    <ButtonComponent
      className={`${className} btn btn-${variant} btn-${size}`}
      to={to}
      onClick={onClick}
      type={type}
    >
      {icon ? icon : null}
      {label}
    </ButtonComponent>
  );
};

export default Button;
