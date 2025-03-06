// Populate dropdowns with sheet names.
function populateSheetSelects() {
    const sheetSelect = document.getElementById("sheetSelect");
    const addSheetSelect = document.getElementById("addSheetSelect");
    sheetSelect.innerHTML = "";
    addSheetSelect.innerHTML = "";
    for (let sheetName in adminData) {
      let option1 = document.createElement("option");
      option1.value = sheetName;
      option1.textContent = sheetName;
      sheetSelect.appendChild(option1);
      let option2 = document.createElement("option");
      option2.value = sheetName;
      option2.textContent = sheetName;
      addSheetSelect.appendChild(option2);
    }
    sheetSelect.onchange = displaySelectedSheetData;
  }
  
  // Display selected sheet data in a table.
  function displaySelectedSheetData() {
    const sheetSelect = document.getElementById("sheetSelect");
    const selectedSheet = sheetSelect.value;
    const dataDisplay = document.getElementById("dataDisplay");
    dataDisplay.innerHTML = "";
    if (!adminData[selectedSheet] || adminData[selectedSheet].length === 0) {
      dataDisplay.textContent = "No data available.";
      return;
    }
    let table = document.createElement("table");
    table.border = "1";
    let headers = Object.keys(adminData[selectedSheet][0]);
    let thead = document.createElement("thead");
    let headerRow = document.createElement("tr");
    headers.forEach(header => {
      let th = document.createElement("th");
      th.textContent = header;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);
    let tbody = document.createElement("tbody");
    adminData[selectedSheet].forEach(row => {
      let tr = document.createElement("tr");
      headers.forEach(header => {
        let td = document.createElement("td");
        td.textContent = row[header] !== undefined ? row[header] : "";
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    dataDisplay.appendChild(table);
  }
  
  // Populate Excel configuration form.
  function populateExcelConfig() {
    const pages = ["Airbnb", "Attractions", "Hotels", "Restaurants", "FoodSpots", "CrimeNews", "Index"];
    const configDiv = document.getElementById("excelConfigDiv");
    configDiv.innerHTML = "";
    let config = JSON.parse(localStorage.getItem("excelSheetConfig")) || {};
    pages.forEach(page => {
      let label = document.createElement("label");
      label.textContent = page + " Sheet: ";
      let input = document.createElement("input");
      input.type = "text";
      input.id = "config_" + page;
      input.value = config[page] || page;
      configDiv.appendChild(label);
      configDiv.appendChild(input);
      configDiv.appendChild(document.createElement("br"));
    });
  }
  
  // Save Excel configuration.
  document.getElementById("saveConfigBtn").addEventListener("click", function() {
    const pages = ["Airbnb", "Attractions", "Hotels", "Restaurants", "FoodSpots", "CrimeNews", "Index"];
    let config = {};
    pages.forEach(page => {
      let input = document.getElementById("config_" + page);
      config[page] = input.value.trim();
    });
    localStorage.setItem("excelSheetConfig", JSON.stringify(config));
    alert("Excel sheet configuration saved.");
  });
  
  // Set up event listeners for Excel load, record addition, and export.
  document.getElementById("loadExcelBtn").addEventListener("click", function() {
    document.getElementById("excelFileInput").click();
  });
  document.getElementById("excelFileInput").addEventListener("change", function(e) {
    loadExcelFile(function() {
      populateSheetSelects();
      displaySelectedSheetData();
      populateExcelConfig();
      alert("Excel file loaded successfully.");
    });
  });
  document.getElementById("addRecordBtn").addEventListener("click", function() {
    let addSheetSelect = document.getElementById("addSheetSelect");
    let selectedSheet = addSheetSelect.value;
    let recordInput = document.getElementById("recordInput").value;
    if (!recordInput) { alert("Please enter a record in JSON format."); return; }
    let newRecord;
    try { newRecord = JSON.parse(recordInput); }
    catch (error) { alert("Invalid JSON format."); return; }
    if (!adminData[selectedSheet]) { adminData[selectedSheet] = []; }
    adminData[selectedSheet].push(newRecord);
    alert("Record added successfully.");
    const sheetSelect = document.getElementById("sheetSelect");
    if (sheetSelect.value === selectedSheet) { displaySelectedSheetData(); }
  });
  document.getElementById("saveExcelBtn").addEventListener("click", function() {
    let newWorkbook = XLSX.utils.book_new();
    for (let sheetName in adminData) {
      let ws = XLSX.utils.json_to_sheet(adminData[sheetName] || []);
      XLSX.utils.book_append_sheet(newWorkbook, ws, sheetName);
    }
    XLSX.writeFile(newWorkbook, "UpdatedData.xlsx");
  });
  