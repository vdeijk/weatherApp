import React from "react";
import styles from "./MainPage.module.css";
import paradeImg from "../../assets/parade.jpg";

const MainPage: React.FC = () => {
  return (
    <div className={styles.containerParent}>
      <img src={paradeImg} alt="Festival Parade" className={styles.heroImg} />
      <div className={styles.mainContainer}>
        <h1 className={styles.h1}>FestivaCast</h1>
        <h3 className={styles.h3}>Check the Skies Before You Celebrate</h3>
      </div>
    </div>
  );
};

export default MainPage;
