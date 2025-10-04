import { makeAutoObservable } from "mobx";
import type { WeatherData } from "../interfaces/WeatherData";
import type { ForecastDay } from "../interfaces/ForecastDay";

class ForecastStore {
  // Observable state
  currentWeather: WeatherData | null = null;
  forecast: ForecastDay[] = [];
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.fetchWeatherData();
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  setError(error: string | null) {
    this.error = error;
  }

  setCurrentWeather(weather: WeatherData) {
    this.currentWeather = weather;
  }

  setForecast(forecast: ForecastDay[]) {
    this.forecast = forecast;
  }

  async fetchWeatherData(location?: string, selectedDate?: Date) {
    this.setLoading(true);
    this.setError(null);

    try {
      // Mock API call - replace with actual weather API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Use selectedDate or default to today
      const baseDate = selectedDate || new Date();

      // Mock current weather data
      const mockWeather: WeatherData = {
        location: location || "New York, NY",
        temperature: Math.round(Math.random() * 30 + 5),
        condition: "Partly Cloudy",
        humidity: Math.round(Math.random() * 40 + 40),
        windSpeed: Math.round(Math.random() * 20 + 5),
        icon: "⛅",
      };

      // Mock forecast data starting from selectedDate
      const mockForecast: ForecastDay[] = Array.from(
        { length: 5 },
        (_, index) => ({
          date: new Date(baseDate.getTime() + index * 24 * 60 * 60 * 1000),
          high: Math.round(Math.random() * 25 + 15),
          low: Math.round(Math.random() * 15 + 5),
          condition: ["Sunny", "Cloudy", "Rainy", "Partly Cloudy"][
            Math.floor(Math.random() * 4)
          ],
          icon: ["☀️", "☁️", "🌧️", "⛅"][Math.floor(Math.random() * 4)],
          humidity: Math.round(Math.random() * 40 + 40),
          windSpeed: Math.round(Math.random() * 20 + 5),
        })
      );

      this.setCurrentWeather(mockWeather);
      this.setForecast(mockForecast);
    } catch (error) {
      this.setError("Failed to fetch weather data");
      console.error("Weather fetch error:", error);
    } finally {
      this.setLoading(false);
    }
  }

  // Computed values
  get isDataAvailable() {
    return this.currentWeather !== null && this.forecast.length > 0;
  }

  get temperatureUnit() {
    return "°C";
  }

  // Clear data
  clearData() {
    this.currentWeather = null;
    this.forecast = [];
    this.error = null;
  }
}

// Create and export store instance
export const forecastStore = new ForecastStore();
