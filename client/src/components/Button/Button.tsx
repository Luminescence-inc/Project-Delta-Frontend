/** @format */

import { Link } from "react-router-dom";

import "./Button.scss";
import { boolean } from "yup";

interface IButton {
  label: string;
  variant?: "primary" | "transparent" | "default";
  size?: "md" | "lg" | "sm";
  to?: string;
  disabled?: boolean;
  onClick?: () => void;
  icon?: JSX.Element;
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
    </ButtonComponent>
  );
};

export default Button;
