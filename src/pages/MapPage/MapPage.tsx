
import React, { useRef, useEffect } from "react";
import { reaction } from "mobx";
import { observer } from "mobx-react-lite";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { mapStore } from "../../states/mapStore";
import { inputStore } from "../../states/inputStore";
import { reverseGeocode } from "../../utils/reverseGeocode";
import "leaflet/dist/leaflet.css";
import styles from "./MapPage.module.css";
import Button from "../../components/Button/Button";

const MapClickHandler: React.FC = () => {
  useMapEvents({
    click: async (e) => {
      mapStore.setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
      const city = await reverseGeocode(e.latlng.lat, e.latlng.lng);
      if (city) {
        inputStore.setLocation(city);
      } else {
        inputStore.setLocation("Unknown Location");
      }
    }
  });
  return null;
};

const MapPage: React.FC = observer(() => {
  const markerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (markerRef.current) {
      // @ts-expect-error: leaflet marker type
      markerRef.current.openPopup();
    }
  }, [mapStore.location.lat, mapStore.location.lng, inputStore.location]);

  // Update inputStore.location from pin coordinates whenever location changes or page is mounted
  useEffect(() => {
    // Run on mount
    (async () => {
      const city = await reverseGeocode(mapStore.location.lat, mapStore.location.lng);
      if (city) {
        inputStore.setLocation(city);
      } else {
        inputStore.setLocation("Unknown Location");
      }
    })();

    // MobX reaction: update inputStore.location whenever mapStore.location changes
    const disposer = reaction(
      () => [mapStore.location.lat, mapStore.location.lng],
      async ([lat, lng]) => {
        const city = await reverseGeocode(lat, lng);
        if (city) {
          inputStore.setLocation(city);
        } else {
          inputStore.setLocation("Unknown Location");
        }
      }
    );
    return () => disposer();
  }, []);

  const handleCenter = () => {
    if (mapRef.current) {
      // @ts-expect-error: leaflet map type
      mapRef.current.setView([mapStore.location.lat, mapStore.location.lng], mapRef.current.getZoom());
    }
  };

  return (
    <div className={styles.mapContainer}>
      <div className={styles.mapPlaceholder} style={{ width: "100%", height: "400px", borderRadius: "var(--border-radius)", overflow: "hidden" }}>
        <h1 className={styles.h1}>Map</h1>
        <MapContainer
          center={[mapStore.location.lat, mapStore.location.lng]}
          zoom={8}
          style={{ width: "100%", height: "100%" }}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />
          <MapClickHandler />
          <Marker position={[mapStore.location.lat, mapStore.location.lng]} ref={markerRef}>
            <Popup autoPan>
              {inputStore.location || "Unknown Location"}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      <div className={styles.controlsCard}>
        <Button onClick={handleCenter}>Center on Pin</Button>
      </div>
    </div>
  );
});

export default MapPage;
