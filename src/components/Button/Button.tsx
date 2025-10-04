import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  disableHover?: boolean;
  ariaLabel?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  className,
  children,
  disableHover = false,
  ariaLabel,
  disabled = false,
}) => {
  const buttonClass = [
    styles.button,
    disableHover && styles.noHover,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClass}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
