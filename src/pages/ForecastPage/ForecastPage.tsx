import React from "react";
import { WeatherWarning } from "../../api/models/WeatherWarning";
import AlertBanner from "../../components/AlertBanner/AlertBanner";
import { observer } from "mobx-react-lite";
import { forecastStore } from "../../states/forecastStore";
import { inputStore } from "../../states/inputStore";
import { mapStore } from "../../states/mapStore";
import { eventsStore } from "../../states/eventsStore";
import styles from "./ForecastPage.module.css";

const ForecastPage: React.FC = observer(() => {
  // Map WeatherWarning enum to messages
  const warningMessages: Record<number, string> = {
    [WeatherWarning.NUMBER_0]: "No warning",
    [WeatherWarning.NUMBER_1]: "Heavy rain expected.",
    [WeatherWarning.NUMBER_2]: "Storm warning.",
    [WeatherWarning.NUMBER_3]: "Extreme heat warning.",
  };
  const { currentWeather, loading } = forecastStore;

  // Determine location to display
  let locationLabel = "Unknown location";
  const selectedEvent = eventsStore.events.find(e => e.id === mapStore.selectedEventId);
  if (selectedEvent?.name) {
    locationLabel = selectedEvent.name;
  } else if (inputStore.location && inputStore.location.trim() !== "") {
    locationLabel = inputStore.location;
  }


  return (
    <>
      {typeof currentWeather?.warning === "number" && currentWeather.warning !== WeatherWarning.NUMBER_0 && (
  <AlertBanner message={warningMessages[currentWeather.warning]} type="warning" icon="⚠️" />
      )}
      <main className={styles["weather-content"]}>
        {loading && (
          <div className={styles["loading-container"]}>
            <div className={styles.spinner}></div>
            <p className={styles["loading-text"]}>Loading weather forecast...</p>
          </div>
        )}
        
        {!loading && !currentWeather && (
          <div className={styles["empty-state"]}>
            <div className={styles["empty-icon"]}>🌤️</div>
            <h2 className={styles["empty-title"]}>No Forecast Data Yet</h2>
            <p className={styles["empty-message"]}>
              Select a location and date on the <strong>Location & Date</strong> page to get started.
            </p>
          </div>
        )}
        
        {!loading && currentWeather && (
          <>
            <div className={styles["current-weather"]}>
              <h2 className={styles.h2}>{locationLabel}</h2>

              <div className={styles["temperature-display"]}>
                <span className={styles["weather-icon"]}>
                  {forecastStore.getWeatherIcon(currentWeather.condition as string)}
                </span>
                <span className={styles.temperature}>
                  {currentWeather.temperature}
                  {forecastStore.temperatureUnit}
                </span>
              </div>

            </div>

            <div className={styles["details-section"]}>
              <h3 className={styles.h3}>Today's Weather</h3>
              <div className={styles["weather-list"]}>
                <div className={styles["detail-card"] + " " + styles["reverse"]}>
                  <span className={styles["detail-icon"]}>💧</span>
                  <div>
                    <p className={styles["detail-label"]}>Humidity</p>
                    <p className={styles["detail-value"]}>
                      {currentWeather.humidity}%
                    </p>
                  </div>
                </div>

                <div className={styles["detail-card"]}>
                  <span className={styles["detail-icon"]}>💨</span>
                  <div>
                    <p className={styles["detail-label"]}>Wind Speed</p>
                    <p className={styles["detail-value"]}>
                      {currentWeather.windSpeed} km/h
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
});

export default ForecastPage;
