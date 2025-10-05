import { makeAutoObservable, runInAction } from "mobx";
import {
  validateLocation,
  validateDate,
  validateInputs,
  sanitizeLocation,
} from "../utils/validation";

class InputStore {
  location = "Global Music Festival"; // Default to first event
  date = new Date();
  locationError = "";
  dateError = "";

  constructor() {
    makeAutoObservable(this);
  }

  setLocation = (location: string) => {
    runInAction(() => {
      this.location = location;
      // Clear error when user types
      if (this.locationError) {
        this.locationError = "";
      }
    });
  };

  setDate = (date: Date) => {
    runInAction(() => {
      this.date = date;
      // Clear error when user changes date
      if (this.dateError) {
        this.dateError = "";
      }
    });
  };

  clearInputs = () => {
    runInAction(() => {
      this.location = "";
      this.date = new Date();
      this.locationError = "";
      this.dateError = "";
    });
  };

  // Validation methods
  validateLocation = (): boolean => {
    const result = validateLocation(this.location);
    runInAction(() => {
      this.locationError = result.error || "";
    });
    return result.isValid;
  };

  validateDate = (): boolean => {
    const result = validateDate(this.date);
    runInAction(() => {
      this.dateError = result.error || "";
    });
    return result.isValid;
  };

  validateAll = (): boolean => {
    const result = validateInputs(this.location, this.date);
    runInAction(() => {
      if (result.error) {
        // Determine which field has the error
        const locationValidation = validateLocation(this.location);
        if (!locationValidation.isValid) {
          this.locationError = locationValidation.error || "";
        } else {
          this.dateError = result.error;
        }
      } else {
        this.locationError = "";
        this.dateError = "";
      }
    });
    return result.isValid;
  };

  sanitizeAndSetLocation = (location: string) => {
    const sanitized = sanitizeLocation(location);
    this.setLocation(sanitized);
  };

  // Computed values
  get isLocationValid() {
    return validateLocation(this.location).isValid;
  }

  get isDateValid() {
    return validateDate(this.date).isValid;
  }

  get isFormValid() {
    return this.isLocationValid && this.isDateValid;
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
