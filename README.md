# Hospital Booking System

The **Hospital Booking System** is a web-based application designed to manage patient registrations, track patient details, and view patient histories. It allows administrators to register new patients, search for existing patients, and view patient histories based on their conditions. This system is built with HTML, CSS, and JavaScript, and leverages **JSON Server** to simulate a backend API for storing patient data.

## Features

- **Patient Registration**: Register new patients by entering their personal information, illness, room assignment, and payment method.
- **Patient List**: View a list of registered patients along with their details.
- **Patient Search**: Search for patients based on their name, condition, or room number.
- **Patient History**: View the history of patients' conditions.
- **Clear Patient List**: Remove all patients from the list.
- **Responsive Layout**: Fully responsive design for a seamless user experience on different screen sizes.

## Technologies Used

- **HTML5**: Structure and content of the web pages.
- **CSS3**: Styling the UI components and layout.
- **JavaScript**: Handling dynamic content, form submission, search functionality, and interaction with JSON Server API.
- **JSON Server**: A fake REST API to simulate a backend for storing and managing patient data.

## Installation

### Prerequisites

1. **Node.js** and **npm** installed on your machine.
2. **JSON Server** installed globally to simulate the backend.

### Steps to Set Up

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/<your-username>/hospital-booking-system.git
   cd hospital-booking-system

2. Install dependencies for JSON Server (if not already installed globally):

    ``` bash
    npm install -g json-server

    ```

3. Create a db.json file for the backend data (you can find the initial structure of db.json in the db.json file provided).

4. Start the JSON Server by running:

``` bash
json-server --watch db.json --port 3000
```

5. Open the index.html file in your browser to see the application in action.

## How It Works

### Registering a Patient

1. In the **Register Patient** section, enter the patient's name, age, condition, payment method, and room number.
2. Select the room category (e.g., General, Private, ICU).
3. Click on the **Add Patient** button to register the patient.
4. The new patient is added to the system and displayed in the patient list.

### Searching for a Patient

1. Use the search bar in the **Patient Details** section to search for a patient by name, condition, or room number.
2. The search results will dynamically update as you type.

### Viewing Patient History

1. The **Patient History** section displays a list of all conditions for the registered patients.
2. Each condition entry is linked to the respective patient's ID.

### Clearing the Patient List

1. Click the **Clear List** button to delete all patients from the system.

### Removing a Patient

1. In the **Patient Details** section, click the **Remove** button next to a patient to delete them from the system.

## Folder Structure

```bash
hospital-booking-system/
│
├── index.html         # Main HTML file
├── style.css          # CSS styles for the project
├── index.js           # JavaScript code handling functionality
├── db.json            # JSON file for patient data (used by JSON Server)
├── favicon.ico        # Favicon for the application
└── README.md          # Project documentation (this file)

```

## Contact

- For questions or issues, please feel free to reach out to:

Email: <contact@hospitalbooking.com>
