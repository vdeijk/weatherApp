import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./MainPage.module.css";

const MainPage: React.FC = observer(() => {
  return (
    <div className={styles["main-container"]}>
      <header className={styles.header}>
        <h1>Weather App</h1>
      </header>
    </div>
  );
});

export default MainPage;
