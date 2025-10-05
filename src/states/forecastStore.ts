import { makeAutoObservable } from "mobx";
import { WeatherApi } from "../api/apis/WeatherApi";
import { Configuration } from "../api/runtime";
import { mapStore } from "./mapStore";
import type { WeatherDataDto } from "../api/models/WeatherDataDto";

class ForecastStore {
  // Utility: select icon based on condition string
  getWeatherIcon(condition?: string): string {
    if (!condition) return "❓";
    const cond = condition.toLowerCase();
    if (cond.includes("sun")) return "☀️";
    if (cond.includes("cloud")) return "☁️";
    if (cond.includes("rain")) return "🌧️";
    if (cond.includes("storm")) return "⛈️";
    if (cond.includes("snow")) return "❄️";
    if (cond.includes("fog") || cond.includes("mist")) return "🌫️";
    return "⛅";
  }
  // Observable state
  currentWeather: WeatherDataDto | null = null;
  // forecast removed: API does not provide forecast data
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    // Fetch weather data automatically on store creation
    this.fetchWeatherData();
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  setError(error: string | null) {
    this.error = error;
  }

  setCurrentWeather(weather: WeatherDataDto) {
    this.currentWeather = weather;
  }

  async fetchWeatherData(date?: Date) {
    this.setLoading(true);
    this.setError(null);

    try {
  const config = new Configuration({ basePath: import.meta.env.VITE_API_BASE_URL });
      const weatherApi = new WeatherApi(config);
      const latitude = mapStore.location.lat;
      const longitude = mapStore.location.lng;
      const dateStr = date ? date.toISOString() : undefined;
      const data = await weatherApi.apiWeatherGet({
        latitude,
        longitude,
        date: dateStr,
      });

      this.setCurrentWeather(data);
    } catch (error) {
      this.setError("Failed to fetch weather data");
      console.error("Weather fetch error:", error);
    } finally {
      this.setLoading(false);
    }
  }

  // Computed values
  get isDataAvailable() {
    return this.currentWeather !== null;
  }

  get temperatureUnit() {
    return "°C";
  }

  // Clear data
  clearData() {
    this.currentWeather = null;
    this.error = null;
  }
}

// Create and export store instance
export const forecastStore = new ForecastStore();
