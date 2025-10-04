import { makeAutoObservable } from "mobx";

export interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description?: string;
}

class EventsStore {
  events: Event[] = [
    {
      id: "1",
      name: "Global Music Festival",
      date: "2025-10-10",
      time: "18:00",
      location: "Amsterdam, NL",
      description: "A celebration of world music."
    },
    {
      id: "2",
      name: "Tech Expo",
      date: "2025-10-12",
      time: "09:00",
      location: "San Francisco, USA",
      description: "Latest in technology and innovation."
    },
    // ...add 8 more mock events
  ];

  constructor() {
    makeAutoObservable(this);
  }

  get upcomingEvents() {
    return this.events.slice(0, 10);
  }
}

export const eventsStore = new EventsStore();
