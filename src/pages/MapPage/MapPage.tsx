
import React, { useRef, useEffect } from "react";
import { reaction } from "mobx";
import { observer } from "mobx-react-lite";
import { MapContainer, TileLayer, Marker, Tooltip, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { mapStore } from "../../states/mapStore";
import { inputStore } from "../../states/inputStore";
import { reverseGeocode } from "../../utils/reverseGeocode";
import "leaflet/dist/leaflet.css";
import styles from "./MapPage.module.css";
import Button from "../../components/Button/Button";

// Create custom red icon for event markers
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Create custom blue icon for user location marker
const blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

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
          {/* Show user location pin only if no event is selected */}
          {!mapStore.selectedEventId && (
            <Marker position={[mapStore.location.lat, mapStore.location.lng]} ref={markerRef} icon={blueIcon}>
              <Tooltip permanent direction="top" offset={[0, -40]}>
                {inputStore.location || "Unknown Location"}
              </Tooltip>
            </Marker>
          )}
          {mapStore.eventMarkers.map(marker => {
            // Use blue icon for selected event, red for others
            const isSelected = marker.id === mapStore.selectedEventId;
            return (
              <Marker 
                key={marker.id} 
                position={[marker.lat, marker.lng]} 
                icon={isSelected ? blueIcon : redIcon}
                eventHandlers={{
                  click: (e) => {
                    L.DomEvent.stopPropagation(e);
                    // Select event and update stores
                    mapStore.selectEvent(marker.id, { lat: marker.lat, lng: marker.lng });
                    inputStore.setLocation(marker.name);
                  }
                }}
              >
                <Tooltip permanent direction="top" offset={[0, -40]}>
                  {marker.name}
                </Tooltip>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
      <div className={styles.controlsCard}>
        <Button onClick={handleCenter} ariaLabel="Center map on selected location">🎯 Center</Button>
      </div>
    </div>
  );
});

export default MapPage;
