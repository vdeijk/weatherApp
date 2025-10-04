import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./DateInput.module.css";

interface DateInputProps {
  value: Date;
  onChange: (value: Date) => void;
  className?: string;
}

const DateInput: React.FC<DateInputProps> = observer(({ value, onChange, className }) => (
  <input
    type="date"
    value={value.toISOString().split("T")[0]}
    onChange={e => onChange(new Date(e.target.value))}
    className={className ? className + " " + styles.dateInput : styles.dateInput}
  />
));

export default DateInput;
