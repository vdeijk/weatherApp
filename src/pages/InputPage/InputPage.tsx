import React from "react";
import { inputStore } from "../../states/inputStore";
import { forecastStore } from "../../states/forecastStore";
import TextInput from "../../components/TextInput/TextInput";
import DateInput from "../../components/DateInput/DateInput";
import Button from "../../components/Button/Button";
import styles from "./InputPage.module.css";

const InputPage: React.FC = () => {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputStore.isLocationValid) {
      forecastStore.fetchWeatherData(inputStore.location, inputStore.date);
    }
  };

  return (
    <div className={styles["input-container"]}>
      <form onSubmit={handleSearch} className={styles["search-form"]}>
        <TextInput
          value={inputStore.location}
          onChange={inputStore.setLocation}
          placeholder="Search city..."
          className={styles["search-input"]}
        />
        <DateInput
          value={inputStore.date}
          onChange={inputStore.setDate}
          className={styles["date-input"]}
        />
        <Button type="submit" className={styles["search-btn"]}>
          🔍 Search
        </Button>
      </form>
    </div>
  );
};

export default InputPage;
