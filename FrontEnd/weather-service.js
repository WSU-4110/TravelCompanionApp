function getSelectedCity() {
  return localStorage.getItem("selectedCity") || "Detroit";
}

function buildForecastUrl(apiKey, city) {
  return `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(city)}&days=5`;
}

module.exports = {
  getSelectedCity,
  buildForecastUrl
};
