/**
 * Validation utilities for user inputs
 * These functions provide robust validation with detailed error messages
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validates location input
 * Rules:
 * - Must not be empty or just whitespace
 * - Must be between 2 and 100 characters
 * - Must contain at least one letter
 * - Should not contain special characters except spaces, hyphens, apostrophes, and commas
 */
export function validateLocation(location: string): ValidationResult {
  // Check if empty or whitespace only
  if (!location || location.trim().length === 0) {
    return {
      isValid: false,
      error: "Location is required"
    };
  }

  const trimmedLocation = location.trim();

  // Check minimum length
  if (trimmedLocation.length < 2) {
    return {
      isValid: false,
      error: "Location must be at least 2 characters"
    };
  }

  // Check maximum length
  if (trimmedLocation.length > 100) {
    return {
      isValid: false,
      error: "Location must be less than 100 characters"
    };
  }

  // Check if contains at least one letter
  if (!/[a-zA-Z]/.test(trimmedLocation)) {
    return {
      isValid: false,
      error: "Location must contain at least one letter"
    };
  }

  // Check for invalid characters (allow letters, numbers, spaces, hyphens, apostrophes, commas, periods)
  if (!/^[a-zA-Z0-9\s\-',.\u00C0-\u017F]+$/.test(trimmedLocation)) {
    return {
      isValid: false,
      error: "Location contains invalid characters"
    };
  }

  return {
    isValid: true
  };
}

/**
 * Validates date input
 * Rules:
 * - Must be a valid Date object
 * - Must not be in the past (before today)
 * - Must not be more than 14 days in the future (typical forecast limit)
 */
export function validateDate(date: Date): ValidationResult {
  // Check if valid Date object
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return {
      isValid: false,
      error: "Invalid date"
    };
  }

  // Normalize dates to midnight for comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const selectedDate = new Date(date);
  selectedDate.setHours(0, 0, 0, 0);

  // Check if date is in the past
  if (selectedDate < today) {
    return {
      isValid: false,
      error: "Date cannot be in the past"
    };
  }

  // Check if date is too far in the future (14 days limit for most weather APIs)
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 14);

  if (selectedDate > maxDate) {
    return {
      isValid: false,
      error: "Date cannot be more than 14 days in the future"
    };
  }

  return {
    isValid: true
  };
}

/**
 * Validates complete form inputs (location + date)
 * Returns combined validation result
 */
export function validateInputs(location: string, date: Date): ValidationResult {
  // Validate location first
  const locationValidation = validateLocation(location);
  if (!locationValidation.isValid) {
    return locationValidation;
  }

  // Then validate date
  const dateValidation = validateDate(date);
  if (!dateValidation.isValid) {
    return dateValidation;
  }

  return {
    isValid: true
  };
}

/**
 * Sanitizes location input by trimming whitespace and normalizing
 */
export function sanitizeLocation(location: string): string {
  return location
    .trim()
    // Replace multiple spaces with single space
    .replace(/\s+/g, ' ')
    // Remove leading/trailing special characters
    .replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, '');
}

/**
 * Formats validation error for display
 */
export function formatValidationError(error: string): string {
  return `⚠️ ${error}`;
}
