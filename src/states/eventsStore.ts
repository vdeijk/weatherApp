import { makeAutoObservable } from "mobx";
import { FestivalApi } from "../api/apis/FestivalApi";
import { Configuration } from "../api/runtime";
import type { FestivalDto } from "../api/models/FestivalDto";

// Use FestivalDto from Swagger-generated models

class EventsStore {
  events: FestivalDto[] = [];
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

  setEvents(events: FestivalDto[]) {
    this.events = events;
  }

  async fetchEvents() {
    this.setLoading(true);
    this.setError(null);
    try {
  const config = new Configuration({ basePath: import.meta.env.VITE_API_BASE_URL });
      const festivalApi = new FestivalApi(config);
      const data = await festivalApi.apiFestivalGet();
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
