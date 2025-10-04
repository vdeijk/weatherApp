import { makeAutoObservable } from "mobx";

export interface Coordinates {
  lat: number;
  lng: number;
}

class MapStore {
  location: Coordinates = { lat: 52.3676, lng: 4.9041 };

  constructor() {
    makeAutoObservable(this);
    // Set Amsterdam as initial location
    this.location = { lat: 52.3676, lng: 4.9041 };
  }

  setLocation = (coords: Coordinates) => {
    this.location = coords;
  };
}

export const mapStore = new MapStore();
