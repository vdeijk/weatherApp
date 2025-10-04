import React from "react";
import styles from "./MainPage.module.css";

const MainPage: React.FC = () => {
  return (
    <div className={styles.containerParent}>
      <div className={styles.mainContainer}>
        <h1 className={styles.h1}>Weather App</h1>
      </div>
    </div>
  );
};

export default MainPage;
