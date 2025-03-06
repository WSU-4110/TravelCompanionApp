// Fetch and display mock weather data.
function fetchWeatherData() {
    let selectedCity = localStorage.getItem("selectedCity") || "Unknown City";
    document.getElementById("weatherCity").textContent = selectedCity;
    let mockCurrent = { temp: 22, wind: 5, desc: "Partly Cloudy" };
    let mockForecast = [
      { day: "Day 1", temp: "21°C", desc: "Sunny" },
      { day: "Day 2", temp: "19°C", desc: "Cloudy" },
      { day: "Day 3", temp: "18°C", desc: "Rainy" },
      { day: "Day 4", temp: "20°C", desc: "Partly Cloudy" },
      { day: "Day 5", temp: "22°C", desc: "Sunny" }
    ];
    document.getElementById("weatherTemp").textContent = mockCurrent.temp + "°C";
    document.getElementById("weatherWind").textContent = mockCurrent.wind + " km/h";
    document.getElementById("weatherDesc").textContent = mockCurrent.desc;
    let forecastList = document.getElementById("forecastList");
    forecastList.innerHTML = "";
    mockForecast.forEach(item => {
      let div = document.createElement("div");
      div.className = "forecast-day";
      div.textContent = `${item.day} - ${item.temp}, ${item.desc}`;
      forecastList.appendChild(div);
    });
  }
  