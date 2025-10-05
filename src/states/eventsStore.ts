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
  events: Event[] = [];
  loading = false;
  error: string | null = null;
  

  constructor() {
    makeAutoObservable(this);
    // Fetch events on initialization
    this.fetchEvents();
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  setError(error: string | null) {
    this.error = error;
  }

  setEvents(events: Event[]) {
    this.events = events;
  }

  async fetchEvents() {
    this.setLoading(true);
    this.setError(null);

    try {
      const response = await fetch("http://localhost:5002/api/Festival");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      // If needed, map backend DTOs to Event interface
      this.setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      this.setError("Failed to load events");
      console.error("Events fetch error:", error);
    } finally {
      this.setLoading(false);
    }
  }

  get upcomingEvents() {
    return this.events.slice(0, 10);
  }
}

export const eventsStore = new EventsStore();
