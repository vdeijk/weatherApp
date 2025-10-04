// src/utils/reverseGeocode.ts
export async function reverseGeocode(lat: number, lng: number): Promise<string | null> {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data && data.address && data.address.city) {
      return data.address.city;
    }
    // Fallback to town or village if city is not available
    if (data && data.address && (data.address.town || data.address.village)) {
      return data.address.town || data.address.village;
    }
    return null;
  } catch (error) {
    console.error("Reverse geocoding error:", error);
    return null;
  }
}
