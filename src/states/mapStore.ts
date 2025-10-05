import { makeAutoObservable } from "mobx";
import { eventsStore } from "./eventsStore";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  name: string;
  type: 'event' | 'location';
}

class MapStore {
  location: Coordinates = { lat: 52.3676, lng: 4.9041 };
  selectedEventId: string | null = "1"; // Default to first event (Amsterdam)

  constructor() {
    makeAutoObservable(this);
    // Set Amsterdam as initial location (matches first event)
    this.location = { lat: 52.3676, lng: 4.9041 };
    // Select the first event by default
    this.selectedEventId = "1";
  }

  setLocation = (coords: Coordinates, clearEvent: boolean = true) => {
    this.location = coords;
    // Clear selected event when user sets a new location (unless specified otherwise)
    if (clearEvent) {
      this.selectedEventId = null;
    }
  };

  selectEvent = (eventId: string, coords: Coordinates) => {
    this.selectedEventId = eventId;
    // Update location without clearing the event selection
    this.setLocation(coords, false);
  };

  clearSelectedEvent = () => {
    this.selectedEventId = null;
  };

  get eventMarkers(): MapMarker[] {
    return eventsStore.upcomingEvents.map(event => ({
      id: event.id ?? "",
      lat: event.lat ?? 0,
      lng: event.lng ?? 0,
      name: event.name ?? "",
      type: 'event' as const
    }));
  }
}

export const mapStore = new MapStore();
