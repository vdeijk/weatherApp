import React from "react";
import AlertBanner from "../../components/AlertBanner/AlertBanner";
import { observer } from "mobx-react-lite";
import { forecastStore } from "../../states/forecastStore";
import styles from "./ForecastPage.module.css";

const ForecastPage: React.FC = observer(() => {
  const { currentWeather, forecast, loading } = forecastStore;

  return (
    <>
      {currentWeather && <AlertBanner message="Heavy rain expected." type="warning" />}
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
              <h2 className={styles.h2}>{currentWeather.location}</h2>

              <div className={styles["temperature-display"]}>
                <span className={styles["weather-icon"]}>
                  {currentWeather.icon}
                </span>
                <span className={styles.temperature}>
                  {currentWeather.temperature}
                  {forecastStore.temperatureUnit}
                </span>
              </div>

              <p className={styles.condition}>{currentWeather.condition}</p>
            </div>

            <div className={styles["details-section"]}>
              <h3 className={styles.h3}>3-Day Forecast</h3>
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

            {forecast.length > 0 && (
              <div className={styles["forecast-section"]}>
                <h3 className={styles.h3}>5-Day Forecast</h3>
                <div className={styles["forecast-list"]}>
                  {forecast.map((day, index) => (
                    <div key={index} className={styles["forecast-item"]}>
                      <span>
                        {day.date.toLocaleDateString("en", { weekday: "short" })}
                      </span>
                      <span>{day.icon}</span>
                      <span>
                        {day.high}°/{day.low}°
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
});

export default ForecastPage;
