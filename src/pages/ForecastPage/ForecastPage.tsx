import React from "react";
import { observer } from "mobx-react-lite";
import { forecastStore } from "../../states/forecastStore";
import styles from "./ForecastPage.module.css";

const ForecastPage: React.FC = observer(() => {
  const { currentWeather, forecast } = forecastStore;

  return (
    <main className={styles["weather-content"]}>
      {currentWeather && (
        <div className={styles["current-weather"]}>
          <div className={styles.location}>
            <h2>{currentWeather.location}</h2>
            {/* Date can be passed as a prop if needed */}
          </div>

          <div className={styles["temperature-display"]}>
            <span className={styles["weather-icon"]}>{currentWeather.icon}</span>
            <span className={styles.temperature}>
              {currentWeather.temperature}
              {forecastStore.temperatureUnit}
            </span>
          </div>

          <p className={styles.condition}>{currentWeather.condition}</p>
        </div>
      )}

      {currentWeather && (
        <div className={styles["weather-details"]}>
          <div className={styles["detail-card"]}>
            <span className={styles["detail-icon"]}>💧</span>
            <div>
              <p className={styles["detail-label"]}>Humidity</p>
              <p className={styles["detail-value"]}>{currentWeather.humidity}%</p>
            </div>
          </div>

          <div className={styles["detail-card"]}>
            <span className={styles["detail-icon"]}>💨</span>
            <div>
              <p className={styles["detail-label"]}>Wind Speed</p>
              <p className={styles["detail-value"]}>{currentWeather.windSpeed} km/h</p>
            </div>
          </div>
        </div>
      )}

      {forecast.length > 0 && (
        <div className={styles["forecast-section"]}>
          <h3>5-Day Forecast</h3>
          <div className={styles["forecast-list"]}>
            {forecast.map((day, index) => (
              <div key={index} className={styles["forecast-item"]}>
                <span>{day.date.toLocaleDateString("en", { weekday: "short" })}</span>
                <span>{day.icon}</span>
                <span>
                  {day.high}°/{day.low}°
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
});

export default ForecastPage;
