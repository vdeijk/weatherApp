import React from "react";
import { observer } from "mobx-react-lite";
import { eventsStore } from "../../states/eventsStore";
import styles from "./EventsPage.module.css";
import EventCard from "../../components/EventCard/EventCard";

const EventsPage: React.FC = observer(() => {
  return (
    <div className={styles.containerParent}>
      <div className={styles.eventsContainer}>
        <h2 className={styles.h1}>Upcoming Events</h2>
        <div className={styles.grid}>
          {eventsStore.upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
});

export default EventsPage;
