import { makeAutoObservable } from "mobx";

class InputStore {
  // Observable state
  location = "";
  date = new Date();

  constructor() {
    makeAutoObservable(this);
  }

  // Actions
  setLocation(location: string) {
    this.location = location;
  }

  setDate(date: Date) {
    this.date = date;
  }

  // Clear inputs
  clearInputs() {
    this.location = "";
    this.date = new Date();
  }

  // Computed values
  get isLocationValid() {
    return this.location.trim().length > 0;
  }

  get formattedDate() {
    return this.date.toLocaleDateString();
  }

  get isDateInFuture() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(this.date);
    selectedDate.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  }
}

// Create and export store instance
export const inputStore = new InputStore();