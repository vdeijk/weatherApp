import React from "react";
import { forecastStore } from "../../states/forecastStore";
import styles from "./ErrorPage.module.css";

interface ErrorPageProps {
  error: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ error }) => {
  const handleRetry = () => {
    // Call the store method in a way that doesn't trigger hook violations
    try {
      forecastStore.fetchWeatherData();
    } catch (err) {
      console.error("Retry failed:", err);
    }
  };

  return (
    <div className={styles["error-container"]}>
      <div className={styles.error}>
        <div className={styles["error-icon"]}>⚠️</div>
        <h2>Oops! Something went wrong</h2>
        <p className={styles["error-message"]}>{error}</p>
        <button onClick={handleRetry} className={styles["retry-btn"]}>
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
