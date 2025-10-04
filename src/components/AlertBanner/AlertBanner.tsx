import React from "react";
import styles from "./AlertBanner.module.css";

interface AlertBannerProps {
  message: string;
  icon?: string;
  type?: "info" | "warning" | "error";
}

const AlertBanner: React.FC<AlertBannerProps> = ({ message, icon = "⚠️", type = "warning" }) => (
  <div className={`${styles.banner} ${styles[type]}`}> 
    <span className={styles.icon}>{icon}</span>
    <span className={styles.message}>{message}</span>
  </div>
);

export default AlertBanner;
