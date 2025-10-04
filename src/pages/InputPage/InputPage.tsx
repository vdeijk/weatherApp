import React from "react";
import { inputStore } from "../../states/inputStore";
import { forecastStore } from "../../states/forecastStore";
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
        <input
          type="text"
          placeholder="Search city..."
          value={inputStore.location}
          onChange={(e) => inputStore.setLocation(e.target.value)}
          className={styles["search-input"]}
        />
        <input
          type="date"
          value={inputStore.date.toISOString().split("T")[0]}
          onChange={(e) => inputStore.setDate(new Date(e.target.value))}
          className={styles["date-input"]}
        />
        <button type="submit" className={styles["search-btn"]}>
          🔍
        </button>
      </form>
    </div>
  );
};

export default InputPage;
