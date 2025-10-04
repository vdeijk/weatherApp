import React from "react";
import { forecastStore } from "../../states/forecastStore";
import styles from "./ErrorPage.module.css";
import Button from "../../components/Button/Button";

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
    <div className={styles.containerParent}>
      <div className={styles.errorContainer}>
        <div className={styles.error}>
          <div className={styles["error-icon"]}>⚠️</div>
          <h1 className={styles.h1}>Oops! Something went wrong</h1>
          <p className={styles["error-message"]}>{error}</p>
          <Button onClick={handleRetry}>Try Again</Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
