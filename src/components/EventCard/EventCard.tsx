import React from "react";
import { observer } from "mobx-react-lite";
import Button from "../Button/Button";
import styles from "./EventCard.module.css";
import type { Event } from "../../states/eventsStore";
import { mapStore } from "../../states/mapStore";
import { inputStore } from "../../states/inputStore";

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = observer(({ event }) => {
  const isSelected = mapStore.selectedEventId === event.id;

  const handleSelect = () => {
    // Select event and update stores
    mapStore.selectEvent(event.id, { lat: event.lat, lng: event.lng });
    inputStore.setLocation(event.name);
  };

  return (
    <div className={`${styles.card} ${isSelected ? styles.selected : ''}`} onClick={handleSelect}>
      <h3 className={styles.h3}>{event.name}</h3>
      <div className={styles.cardDetails}>
        <span className={styles.eventDate}>{event.date}</span>
        <span className={styles.eventTime}>{event.time}</span>
        <span className={styles.eventLocation}>{event.location}</span>
      </div>
      {event.description && (
        <div className={styles.eventDescription}>{event.description}</div>
      )}
      <Button disableHover>📍 Select Event</Button>
    </div>
  );
});

export default EventCard;
