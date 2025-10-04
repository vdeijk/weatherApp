import React from "react";
import styles from "./LoadingPage.module.css";

const LoadingPage: React.FC = () => {
  return (
    <div className={styles["loading-container"]}>
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading weather data...</p>
      </div>
    </div>
  );
};

export default LoadingPage;