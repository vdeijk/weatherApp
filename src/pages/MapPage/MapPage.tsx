
import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./MapPage.module.css";

const MapPage: React.FC = () => (
  <div className={styles.mapContainer}>
    <div className={styles.mapPlaceholder} style={{ width: "100%", height: "400px", borderRadius: "var(--border-radius)", overflow: "hidden" }}>
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ width: "100%", height: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
      </MapContainer>
    </div>
  </div>
);

export default MapPage;
