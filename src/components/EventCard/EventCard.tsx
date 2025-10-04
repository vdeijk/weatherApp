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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelect();
    }
  };

  return (
    <div 
      className={`${styles.card} ${isSelected ? styles.selected : ''}`} 
      onClick={handleSelect}
      onKeyPress={handleKeyPress}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`Event: ${event.name} on ${event.date} at ${event.time} in ${event.location}`}
    >
      <h3 className={styles.h3}>{event.name}</h3>
      <div className={styles.cardDetails}>
        <span className={styles.eventDate} aria-label={`Date: ${event.date}`}>{event.date}</span>
        <span className={styles.eventTime} aria-label={`Time: ${event.time}`}>{event.time}</span>
        <span className={styles.eventLocation} aria-label={`Location: ${event.location}`}>{event.location}</span>
      </div>
      {event.description && (
        <div className={styles.eventDescription}>{event.description}</div>
      )}
      <Button disableHover ariaLabel="Select this event and view on map">📍 Select Event</Button>
    </div>
  );
});

export default EventCard;
