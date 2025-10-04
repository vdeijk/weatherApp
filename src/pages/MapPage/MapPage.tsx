
import React, { useRef, useEffect, useState } from "react";
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

// Create custom red icon for selected markers (events and user location)
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Create custom blue icon for unselected event markers
const blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapClickHandler: React.FC<{
  onGeocodingStart: () => void;
  onGeocodingEnd: () => void;
}> = ({ onGeocodingStart, onGeocodingEnd }) => {
  useMapEvents({
    click: async (e) => {
      onGeocodingStart();
      mapStore.setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
      
      try {
        const city = await reverseGeocode(e.latlng.lat, e.latlng.lng);
        if (city) {
          inputStore.setLocation(city);
        } else {
          inputStore.setLocation("Unknown Location");
        }
      } finally {
        onGeocodingEnd();
      }
    }
  });
  return null;
};

const MapPage: React.FC = observer(() => {
  const markerRef = useRef(null);
  const mapRef = useRef(null);
  const [isGeocoding, setIsGeocoding] = useState(false);

  // Update inputStore.location from pin coordinates whenever location changes or page is mounted
  useEffect(() => {
    // Run on mount
    (async () => {
      setIsGeocoding(true);
      try {
        const city = await reverseGeocode(mapStore.location.lat, mapStore.location.lng);
        if (city) {
          inputStore.setLocation(city);
        } else {
          inputStore.setLocation("Unknown Location");
        }
      } finally {
        setIsGeocoding(false);
      }
    })();

    // MobX reaction: update inputStore.location whenever mapStore.location changes
    const disposer = reaction(
      () => [mapStore.location.lat, mapStore.location.lng],
      async ([lat, lng]) => {
        setIsGeocoding(true);
        try {
          const city = await reverseGeocode(lat, lng);
          if (city) {
            inputStore.setLocation(city);
          } else {
            inputStore.setLocation("Unknown Location");
          }
        } finally {
          setIsGeocoding(false);
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
      <div className={styles.mapPlaceholder} style={{ width: "100%", height: "400px", borderRadius: "var(--border-radius)", overflow: "hidden", position: "relative" }}>
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
          <MapClickHandler 
            onGeocodingStart={() => setIsGeocoding(true)}
            onGeocodingEnd={() => setIsGeocoding(false)}
          />
          {/* Show user location pin only if no event is selected */}
          {!mapStore.selectedEventId && (
            <Marker position={[mapStore.location.lat, mapStore.location.lng]} ref={markerRef} icon={redIcon}>
              <Tooltip permanent direction="top" offset={[0, -40]} className="selected-event-tooltip">
                {inputStore.location || "Unknown Location"}
              </Tooltip>
            </Marker>
          )}
          {mapStore.eventMarkers.map(marker => {
            // Use red icon for selected event, blue for others
            const isSelected = marker.id === mapStore.selectedEventId;
            return (
              <Marker 
                key={marker.id} 
                position={[marker.lat, marker.lng]} 
                icon={isSelected ? redIcon : blueIcon}
                eventHandlers={{
                  click: (e) => {
                    L.DomEvent.stopPropagation(e);
                    // Select event and update stores
                    mapStore.selectEvent(marker.id, { lat: marker.lat, lng: marker.lng });
                    inputStore.setLocation(marker.name);
                  }
                }}
              >
                <Tooltip 
                  key={`${marker.id}-${isSelected}`}
                  permanent 
                  direction="top" 
                  offset={[0, -40]}
                  className={isSelected ? 'selected-event-tooltip' : ''}
                >
                  {marker.name}
                </Tooltip>
              </Marker>
            );
          })}
        </MapContainer>
        
        {isGeocoding && (
          <div className={styles.geocodingIndicator}>
            <div className={styles.geocodingSpinner}></div>
            <span className={styles.geocodingText}>Finding location...</span>
          </div>
        )}
      </div>
      <div className={styles.controlsCard}>
        <Button onClick={handleCenter} ariaLabel="Center map on selected location">🎯 Center</Button>
      </div>
    </div>
  );
});

export default MapPage;
