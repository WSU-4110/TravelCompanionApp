# How to Run the TravelCompanion App


This project has a CSV file, which has to be loaded via a server due to browser security restrictions. Opening `login.html` directly (via double-click) on a web server
**won’t work** due to inability to access the CSV file contents. 

---

## How to Run Using Live Server (Required for CSV Access)

To run the app properly and load the CSV file:

**1. Install Visual Studio Code (if not already):**
   [Download here](https://code.visualstudio.com/)

**2. Install Live Server extension**:
   - Open VS Code
   - Go to the Extensions tab
   - Search for **Live Server** and install it.
     
**3. Clone the Repository**:
- git clone https://github.com/WSU-4110/TravelCompanionApp.git

**4. Open the project folder** in VS Code:
   - cd TravelCompanionApp
   - code .

**5. Go to login.html and select:**
   - "Open With Live Server"
---
## Optional Access with Python
1. Navigate to the project folder
- cd TravelCompanionApp
- python -m http.server
  
2. Open in your browser:
- [http://localhost:8000/login.html](http://localhost:8000/login.html)
---
## Optional Access using NodeJs
1. Install Node.js:
  https://nodejs.org/

2. Install a static server tool globally (only needs to be done once):

- npm install -g serve

3. Navigate to the project folder:

- cd TravelCompanionApp

4. Start the server:

- serve .

5. Use the local server URL:
   http://localhost:3000/login.html
