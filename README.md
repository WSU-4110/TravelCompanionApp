# TravelCompanionApp

## Overview

TravelCompanionApp is a travel companion web application featuring:

- **User Registration & Login:**  
  Users can register and log in. Admins log in with email **admin** and password **admin**.

- **Excel Integration:**  
  Load data from Excel files with multiple sheets. The admin panel lets you configure which sheet each page uses, add records, and export updated data. Configurations persist in localStorage.

- **City Filtering & Sorting:**  
  Data (e.g. Attractions) is filtered by a selected city (set via the select-city page) and can be sorted by Price or Rating.

- **Chat Box:**  
  A simple chat box on the homepage timestamps and stores messages in localStorage.

- **Weather Forecast:**  
  The weather page shows current weather and a 5-day forecast (using mock data).

## Excel File Format

Your Excel file should include the following sheets:

- **Airbnb:** Columns: `Name`, `Price`, `Contact`, `City`  
  Example: `"Detroit Airbnb A", 100, "555-0101", "Detroit"`

- **Attractions:** Columns: `Info`, `City`, (optional) `Price`, (optional) `Rating`  
  Example: `"Detroit Attraction A – Must See", "Detroit", 20, 4.5`

- **Hotels:** Columns: `Name`, `Price`, `Contact`, `City`  
  Example: `"Detroit Hotel A", 150, "555-0201", "Detroit"`

- **Restaurants:** Columns: `Name`, `Price`, `Contact`, `City`  
  Example: `"Detroit Restaurant A", 40, "555-0301", "Detroit"`

- **FoodSpots:** Columns: `Info`, `City`  
  Example: `"Detroit Food Spot A – Best Burgers", "Detroit"`

- **CrimeNews:** Columns: `Info`, `City`  
  Example: `"Detroit Crime Report – Incident A", "Detroit"`

- **Index:** Columns: `Featured`, `City`  
  Example: `"Detroit Featured Destination", "Detroit"`

- **Dashboard (Optional):** Use for any dashboard data.

