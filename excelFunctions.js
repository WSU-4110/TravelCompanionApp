// Global object to store Excel sheet data.
var adminData = {};

// Parse Excel file and store each sheet as JSON.
function loadExcelFile(callback) {
  loadExcelData(function(workbook) {
    adminData = {};
    workbook.SheetNames.forEach(sheetName => {
      let sheet = workbook.Sheets[sheetName];
      adminData[sheetName] = XLSX.utils.sheet_to_json(sheet);
    });
    if (callback) callback();
  });
}

// Load Airbnb sheet (filtering for Detroit).
function loadAirbnbFromExcel() {
  loadExcelData(function(workbook) {
    let config = JSON.parse(localStorage.getItem("excelSheetConfig")) || {};
    let sheetName = config["Airbnb"] || "Airbnb";
    let sheet = workbook.Sheets[sheetName];
    if (!sheet) { alert("No '" + sheetName + "' sheet found."); return; }
    let jsonData = XLSX.utils.sheet_to_json(sheet);
    let detroitData = jsonData.filter(row => row.City === "Detroit");
    let existing = JSON.parse(localStorage.getItem("airbnb")) || [];
    localStorage.setItem("airbnb", JSON.stringify(existing.concat(detroitData)));
    if (typeof loadAirbnbs === "function") loadAirbnbs();
  });
}

// Load Attractions sheet filtered by selected city.
function loadAttractionsFromExcel() {
  loadExcelData(function(workbook) {
    let config = JSON.parse(localStorage.getItem("excelSheetConfig")) || {};
    let sheetName = config["Attractions"] || "Attractions";
    let sheet = workbook.Sheets[sheetName];
    if (!sheet) { alert("No '" + sheetName + "' sheet found."); return; }
    let jsonData = XLSX.utils.sheet_to_json(sheet);
    let cityFilter = localStorage.getItem("selectedCity") || "Detroit";
    let filteredData = jsonData.filter(row => row.City === cityFilter);
    localStorage.setItem("attractions", JSON.stringify(filteredData));
    if (typeof loadAttractions === "function") loadAttractions();
  });
}

// Load Business sheet for the selected type.
function loadBusinessFromExcel() {
  loadExcelData(function(workbook) {
    let type = document.getElementById("businessType").value;
    let config = JSON.parse(localStorage.getItem("excelSheetConfig")) || {};
    let sheetName = config[type.charAt(0).toUpperCase() + type.slice(1)] || (type.charAt(0).toUpperCase() + type.slice(1));
    let sheet = workbook.Sheets[sheetName];
    if (!sheet) { alert("No sheet named '" + sheetName + "' found."); return; }
    let jsonData = XLSX.utils.sheet_to_json(sheet);
    let cityFilter = localStorage.getItem("selectedCity") || "Detroit";
    let filteredData = jsonData.filter(row => row.City === cityFilter);
    let existing = JSON.parse(localStorage.getItem(type)) || [];
    localStorage.setItem(type, JSON.stringify(existing.concat(filteredData)));
    alert("Business data loaded for " + cityFilter + ".");
  });
}

// Load Restaurants sheet filtered by city.
function loadRestaurantsFromExcel() {
  loadExcelData(function(workbook) {
    let config = JSON.parse(localStorage.getItem("excelSheetConfig")) || {};
    let sheetName = config["Restaurants"] || "Restaurants";
    let sheet = workbook.Sheets[sheetName];
    if (!sheet) { alert("No '" + sheetName + "' sheet found."); return; }
    let jsonData = XLSX.utils.sheet_to_json(sheet);
    let cityFilter = localStorage.getItem("selectedCity") || "Detroit";
    let filteredData = jsonData.filter(row => row.City === cityFilter);
    let existing = JSON.parse(localStorage.getItem("restaurant")) || [];
    localStorage.setItem("restaurant", JSON.stringify(existing.concat(filteredData)));
    if (typeof loadRestaurants === "function") loadRestaurants();
  });
}

// Load FoodSpots sheet.
function loadFoodspotsFromExcel() {
  loadExcelData(function(workbook) {
    let config = JSON.parse(localStorage.getItem("excelSheetConfig")) || {};
    let sheetName = config["FoodSpots"] || "FoodSpots";
    let sheet = workbook.Sheets[sheetName];
    if (!sheet) { alert("No '" + sheetName + "' sheet found."); return; }
    let jsonData = XLSX.utils.sheet_to_json(sheet);
    let cityFilter = localStorage.getItem("selectedCity") || "Detroit";
    let filteredData = jsonData.filter(row => row.City === cityFilter);
    localStorage.setItem("foodspots", JSON.stringify(filteredData));
    if (typeof loadFoodspots === "function") loadFoodspots();
  });
}

// Load CrimeNews sheet.
function loadCrimeNewsFromExcel() {
  loadExcelData(function(workbook) {
    let config = JSON.parse(localStorage.getItem("excelSheetConfig")) || {};
    let sheetName = config["CrimeNews"] || "CrimeNews";
    let sheet = workbook.Sheets[sheetName];
    if (!sheet) { alert("No '" + sheetName + "' sheet found."); return; }
    let jsonData = XLSX.utils.sheet_to_json(sheet);
    let cityFilter = localStorage.getItem("selectedCity") || "Detroit";
    let filteredData = jsonData.filter(row => row.City === cityFilter);
    localStorage.setItem("crimeNews", JSON.stringify(filteredData));
    if (typeof loadCrimeNews === "function") loadCrimeNews();
  });
}

// Load Index sheet.
function loadIndexExcelData() {
  loadExcelData(function(workbook) {
    let config = JSON.parse(localStorage.getItem("excelSheetConfig")) || {};
    let sheetName = config["Index"] || "Index";
    let sheet = workbook.Sheets[sheetName];
    if (!sheet) { alert("No '" + sheetName + "' sheet found."); return; }
    let jsonData = XLSX.utils.sheet_to_json(sheet);
    console.log("Index sheet data:", jsonData);
    alert("Index data loaded (check console for details).");
  });
}
