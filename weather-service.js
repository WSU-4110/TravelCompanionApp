export function getSelectedCity() {
  return localStorage.getItem("selectedCity") || "Detroit";
}
export function buildForecastUrl(apiKey, city) {
  return `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(city)}&days=5`;
}
