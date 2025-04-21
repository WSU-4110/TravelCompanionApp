export function getSelectedCity() {
  const city = localStorage.getItem("selectedCity");
  return city && city.trim() !== "" ? city : "Detroit";
}

export function buildForecastUrl(apiKey, city) {
  return `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(city)}&days=5`;
}
