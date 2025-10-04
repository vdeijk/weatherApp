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
      <form onSubmit={handleSearch} aria-label="Weather forecast search form">
        <div className={styles["search-form"]}>
          <h1 className={styles.h1}>Location & Date</h1>
          <label htmlFor="location-input" className={styles.visuallyHidden}>
            City or location name
          </label>
          <TextInput
            id="location-input"
            value={inputStore.location}
            onChange={inputStore.setLocation}
            placeholder="Search city..."
            ariaLabel="Enter city or location name"
            className={styles["search-input"]}
          />
          <label htmlFor="date-input" className={styles.visuallyHidden}>
            Event date
          </label>
          <DateInput
            id="date-input"
            value={inputStore.date}
            onChange={inputStore.setDate}
            ariaLabel="Select event date"
            className={styles["date-input"]}
          />
        </div>
        <div className={styles.controlsCard}>
          <Button 
            type="submit" 
            className={styles["search-btn"]}
            ariaLabel="Get weather forecast for selected location and date"
          >
            🔍 Get Forecast
          </Button>
        </div>
      </form>
    </div>
  );
});

export default InputPage;
