import { getSelectedCity, buildForecastUrl } from './weather-service.js';

describe("Weather Service", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("returns 'Detroit' when nothing is set", () => {
    expect(getSelectedCity()).toBe("Detroit");
  });

  test("returns city from localStorage", () => {
    localStorage.setItem("selectedCity", "Miami");
    expect(getSelectedCity()).toBe("Miami");
  });

  test("returns default even if localStorage has empty string", () => {
    localStorage.setItem("selectedCity", "");
    expect(getSelectedCity()).toBe("Detroit");
  });

  test("builds correct forecast URL", () => {
    const apiKey = "demoKey";
    const city = "New York";
    const expected = "https://api.weatherapi.com/v1/forecast.json?key=demoKey&q=New%20York&days=5";
    expect(buildForecastUrl(apiKey, city)).toBe(expected);
  });

  test("builds URL with special characters in city", () => {
    const apiKey = "demoKey";
    const city = "San José";
    const expected = "https://api.weatherapi.com/v1/forecast.json?key=demoKey&q=San%20Jos%C3%A9&days=5";
    expect(buildForecastUrl(apiKey, city)).toBe(expected);
  });

  test("builds URL when API key is missing", () => {
    const city = "Chicago";
    const expected = "https://api.weatherapi.com/v1/forecast.json?key=&q=Chicago&days=5";
    expect(buildForecastUrl("", city)).toBe(expected);
  });
});
