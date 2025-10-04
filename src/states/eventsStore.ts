import { makeAutoObservable } from "mobx";

export interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  lat: number;
  lng: number;
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
      lat: 52.3676,
      lng: 4.9041,
      description: "A celebration of world music."
    },
    {
      id: "2",
      name: "Tech Expo",
      date: "2025-10-12",
      time: "09:00",
      location: "San Francisco, USA",
      lat: 37.7749,
      lng: -122.4194,
      description: "Latest in technology and innovation."
    },
    {
      id: "3",
      name: "Food & Wine Festival",
      date: "2025-10-15",
      time: "12:00",
      location: "Paris, France",
      lat: 48.8566,
      lng: 2.3522,
      description: "Culinary delights from around the world."
    },
    {
      id: "4",
      name: "Art Exhibition",
      date: "2025-10-18",
      time: "10:00",
      location: "London, UK",
      lat: 51.5074,
      lng: -0.1278,
      description: "Contemporary art showcase."
    },
    {
      id: "5",
      name: "Marathon Run",
      date: "2025-10-20",
      time: "07:00",
      location: "New York, USA",
      lat: 40.7128,
      lng: -74.0060,
      description: "Annual city marathon event."
    }
  ];

  constructor() {
    makeAutoObservable(this);
  }

  get upcomingEvents() {
    return this.events.slice(0, 10);
  }
}

export const eventsStore = new EventsStore();
