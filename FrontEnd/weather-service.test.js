import { getSelectedCity, buildForecastUrl } from './weather-service.js';

describe("Weather Service", () => {
  beforeEach(() => localStorage.clear());

  test("returns 'Detroit' when nothing is set", () => {
    expect(getSelectedCity()).toBe("Detroit");
  });

  test("returns value from localStorage", () => {
    localStorage.setItem("selectedCity", "Miami");
    expect(getSelectedCity()).toBe("Miami");
  });

  test("builds correct forecast URL", () => {
    const apiKey = "demoKey";
    const city = "New York";
    const expected = "https://api.weatherapi.com/v1/forecast.json?key=demoKey&q=New%20York&days=5";
    expect(buildForecastUrl(apiKey, city)).toBe(expected);
  });
});