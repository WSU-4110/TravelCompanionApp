// Loads an Excel file and passes the workbook to a callback.
function loadExcelData(callback) {
    let fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".xlsx, .xls";
    fileInput.onchange = (e) => {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.onload = function(e) {
        let workbook = XLSX.read(e.target.result, { type: 'binary' });
        callback(workbook);
      };
      reader.readAsBinaryString(file);
    };
    fileInput.click();
  }
  