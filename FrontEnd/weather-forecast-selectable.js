const apiKey = '55e43aefcb5a440dbef172501252703';

function getSelectedCity() {
  return localStorage.getItem("selectedCity") || "Detroit";
}

function renderForecastSelector(forecastData) {
  const selector = document.getElementById("forecast-selector");
  const display = document.getElementById("forecast-display");
  if (!selector || !display) return;
  selector.innerHTML = "";
  forecastData.forEach((day, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${day.date} - ${day.day.condition.text}`;
    selector.appendChild(option);
  });
  selector.addEventListener("change", () => {
    showForecastForDay(forecastData[selector.value]);
  });
  showForecastForDay(forecastData[0]);
}

function showForecastForDay(day) {
  const display = document.getElementById("forecast-display");
  display.innerHTML = `
    <h3>Forecast for ${day.date}</h3>
    <img src="${day.day.condition.icon}" alt="${day.day.condition.text}">
    <p>${day.day.condition.text}</p>
    <p>Avg Temp: ${day.day.avgtemp_c}°C</p>
    <p>Max: ${day.day.maxtemp_c}°C / Min: ${day.day.mintemp_c}°C</p>
    <p>Wind: ${day.day.maxwind_kph} kph</p>
    <p>Humidity: ${day.day.avghumidity}%</p>
  `;
}

function weather() {
  const city = getSelectedCity();
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(city)}&days=5`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      renderForecastSelector(data.forecast.forecastday);
    })
    .catch(error => console.error("Error fetching forecast:", error));
}

window.onload = weather;
export default weather;
