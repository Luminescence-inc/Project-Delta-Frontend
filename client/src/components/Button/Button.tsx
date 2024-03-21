/** @format */

import { Link } from "react-router-dom";

import "./Button.scss";

interface IButton {
  label: React.ReactNode;
  variant?: "primary" | "transparent" | "secondary" | "default" | "cancel";
  size?: "md" | "lg" | "sm";
  to?: string;
  disabled?: boolean;
  onClick?: () => void;
  icon?: JSX.Element;
  iconRight?: JSX.Element;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
}

const Button = ({
  label,
  disabled,
  variant = "default",
  size = "md",
  to = "",
  onClick,
  icon,
  iconRight,
  className,
  type,
}: IButton) => {
  const ButtonComponent = to ? Link : "button";
  return (
    <ButtonComponent
      className={`${className} btn btn-${variant} btn-${size}`}
      to={to}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {icon ? icon : null}
      {label}
      {iconRight ? iconRight : null}
    </ButtonComponent>
  );
};

export default Button;
