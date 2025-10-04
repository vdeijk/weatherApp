import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  className,
  children,
}) => (
  <button
    type={type}
    onClick={onClick}
    className={className ? className + " " + styles.button : styles.button}
  >
    {children}
  </button>
);

export default Button;
