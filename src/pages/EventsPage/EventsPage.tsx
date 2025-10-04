import React from "react";
import { observer } from "mobx-react-lite";
import { eventsStore } from "../../states/eventsStore";
import styles from "./EventsPage.module.css";
import EventCard from "../../components/EventCard/EventCard";

const EventsPage: React.FC = observer(() => {
  const { upcomingEvents, loading, error } = eventsStore;

  return (
    <div className={styles.containerParent}>
      <div className={styles.eventsContainer}>
        <h2 className={styles.h1}>Upcoming Events</h2>
        
        {loading && (
          <div className={styles.grid}>
            {[...Array(4)].map((_, index) => (
              <div key={index} className={styles.skeletonCard}>
                <div className={styles.skeletonHeader}></div>
                <div className={styles.skeletonText}></div>
                <div className={styles.skeletonText}></div>
                <div className={styles.skeletonText}></div>
                <div className={styles.skeletonButton}></div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className={styles.errorState}>
            <div className={styles.errorIcon}>⚠️</div>
            <h3 className={styles.errorTitle}>Failed to Load Events</h3>
            <p className={styles.errorMessage}>{error}</p>
            <button 
              className={styles.retryButton}
              onClick={() => eventsStore.fetchEvents()}
            >
              🔄 Retry
            </button>
          </div>
        )}

        {!loading && !error && upcomingEvents.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📅</div>
            <h3 className={styles.emptyTitle}>No Events Available</h3>
            <p className={styles.emptyMessage}>
              There are no upcoming events at the moment. Check back later!
            </p>
          </div>
        )}

        {!loading && !error && upcomingEvents.length > 0 && (
          <div className={styles.grid}>
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

export default EventsPage;
