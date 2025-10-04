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
  selectedEventId: string | null = null;

  constructor() {
    makeAutoObservable(this);
    // Set Amsterdam as initial location
    this.location = { lat: 52.3676, lng: 4.9041 };
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
      id: event.id,
      lat: event.lat,
      lng: event.lng,
      name: event.name,
      type: 'event' as const
    }));
  }
}

export const mapStore = new MapStore();
