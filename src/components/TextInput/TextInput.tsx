import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./TextInput.module.css";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  ariaLabel?: string;
  id?: string;
}

const TextInput: React.FC<TextInputProps> = observer(({ value, onChange, placeholder, className, ariaLabel, id }) => (
  <input
    type="text"
    id={id}
    value={value}
    onChange={e => onChange(e.target.value)}
    placeholder={placeholder}
    aria-label={ariaLabel || placeholder || "Text input"}
    className={className ? className + " " + styles.textInput : styles.textInput}
  />
));

export default TextInput;
