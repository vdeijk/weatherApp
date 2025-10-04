import { makeAutoObservable, runInAction } from "mobx";

class InputStore {
  location = "";
  date = new Date();

  constructor() {
    makeAutoObservable(this);
  }

  setLocation = (location: string) => {
    runInAction(() => {
      console.log("location set to:", location);
      this.location = location;
    });
  }

  setDate = (date: Date) => {
    runInAction(() => {
      this.date = date;
    });
  }

  clearInputs = () => {
    runInAction(() => {
      this.location = "";
      this.date = new Date();
    });
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

export const inputStore = new InputStore();