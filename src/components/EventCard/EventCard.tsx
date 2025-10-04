import React from "react";
import { observer } from "mobx-react-lite";
import Button from "../Button/Button";
import styles from "./EventCard.module.css";
import type { Event } from "../../states/eventsStore";

interface EventCardProps {
  event: Event;
  onSelect?: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = observer(({ event, onSelect }) => (
  <div className={styles.card}>
    <h3 className={styles.h3}>{event.name}</h3>
    <div className={styles.cardDetails}>
      <span className={styles.eventDate}>{event.date}</span>
      <span className={styles.eventTime}>{event.time}</span>
      <span className={styles.eventLocation}>{event.location}</span>
    </div>
    {event.description && (
      <div className={styles.eventDescription}>{event.description}</div>
    )}
    <Button onClick={() => onSelect?.(event)}>📍 View on Map</Button>
  </div>
));

export default EventCard;
