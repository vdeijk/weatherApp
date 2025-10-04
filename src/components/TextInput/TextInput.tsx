import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./TextInput.module.css";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const TextInput: React.FC<TextInputProps> = observer(({ value, onChange, placeholder, className }) => (
  <input
    type="text"
    value={value}
    onChange={e => onChange(e.target.value)}
    placeholder={placeholder}
    className={className ? className + " " + styles.textInput : styles.textInput}
  />
));

export default TextInput;
