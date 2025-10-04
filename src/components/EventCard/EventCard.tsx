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
    <div className={styles.cardHeader}>
      <span className={styles.eventName}>{event.name}</span>
    </div>
    <div className={styles.cardDetails}>
      <span className={styles.eventDate}>{event.date}</span>
      <span className={styles.eventTime}>{event.time}</span>
      <span className={styles.eventLocation}>{event.location}</span>
    </div>
    {event.description && (
      <div className={styles.eventDescription}>{event.description}</div>
    )}
    <Button onClick={() => onSelect?.(event)}>
      View on Map
    </Button>
  </div>
));

export default EventCard;
