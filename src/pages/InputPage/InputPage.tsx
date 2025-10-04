import React from "react";
import { observer } from "mobx-react-lite";
import { inputStore } from "../../states/inputStore";
import { mapStore } from "../../states/mapStore";
import { geocodeCity } from "../../utils/geocode";
import { forecastStore } from "../../states/forecastStore";
import TextInput from "../../components/TextInput/TextInput";
import DateInput from "../../components/DateInput/DateInput";
import Button from "../../components/Button/Button";
import styles from "./InputPage.module.css";

const InputPage: React.FC = observer(() => {
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputStore.isLocationValid) {
      // Geocode city and update mapStore
      const coords = await geocodeCity(inputStore.location);
      if (coords) {
        mapStore.setLocation(coords);
      }
      forecastStore.fetchWeatherData(inputStore.location, inputStore.date);
    }
  };

  return (
    <div className={styles["input-container"]}>
      <form onSubmit={handleSearch}>
        <div className={styles["search-form"]}>
          <h1 className={styles.h1}>Search Weather</h1>
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
        </div>
        <div className={styles.controlsCard}>
          <Button type="submit" className={styles["search-btn"]}>
            🔍 Search
          </Button>
        </div>
      </form>
    </div>
  );
});

export default InputPage;
