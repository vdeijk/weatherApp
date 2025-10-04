import React from "react";
import styles from "./MapPage.module.css";

const MapPage: React.FC = () => (
  <div className={styles.mapContainer}>
    <h2>Map</h2>
    <div className={styles.mapPlaceholder}>
      {/* Leaflet map will be added here */}
      <p>Map will appear here.</p>
    </div>
  </div>
);

export default MapPage;
