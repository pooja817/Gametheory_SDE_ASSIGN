# Schedule Management Application - GameTheory

### College ID: IEC2021080

## Overview

This project is a **Schedule Management Application** designed to manage bookings for different courts based on sports. It provides the following features:

- Displays a **schedule grid** showing available and booked time slots.
- Allows **new bookings** through a modal form.
- Supports **vertical and horizontal scrolling** inside the grid.
- **Sticky time and court headers** to maintain context during scrolling.
- User-specific **color coding** with a legend.

Both frontend and backend are integrated to handle data dynamically using APIs.

---

### Screenshots

#### View Bookings

![View Bookings](frontend/public/Screenshots/View%20Bookings.png)


#### Create Bookings
![Create Bookings](frontend/public/Screenshots/Create%20Bookings.png)

## Prerequisites

Ensure you have the following installed:

- **Node.js** (v14+)
- **npm** or **yarn**
- **Backend API** running locally on localhost:3002 or as per your configuration.
- **Frontend dependencies** (installed via npm/yarn)

---

## Setup Instructions

### 1. Clone the Repository
```bash I'm A tab
git clone <repository-url>
cd schedule-management-app
```


### 2. Install Dependencies
#### Frontend

```bash I'm A tab
cd frontend
npm install
```

#### Backend
```bash I'm A tab
cd backend
npm install
```
3. Run the Backend Server
```bash I'm A tab
cd backend
node server.js
```
The backend will start running at http://localhost:3002.

4. Run the Frontend Application
```bash I'm A tab
cd frontend
npm start
```
The frontend will be available at http://localhost:3000.

### Links
#### Frontend Application: Deployed Frontend URL
#### Backend Application: Deployed Backend URL

### Assumptions & Limitations
- Time slots are hourly-based and follow the format: 1 AM - 2 AM.
- The grid layout can handle up to 6 courts and 24 hours per day.
- The application assumes simultaneous running of frontend and backend.
- Availability of courts is fetched dynamically from the backend via APIs.

### Application Features
#### Grid with Sticky Time and Court Headers:

- The time column remains fixed while scrolling horizontally.
- Court names stay at the top while scrolling vertically.
- Both horizontal and vertical scrolling is limited to the grid container, ensuring that the entire page doesn’t scroll.

#### User-Specific Color Mapping with Legend:

- Each user booking is displayed with a specific background color.
- Legend below the grid helps identify each user’s bookings.

#### New Booking Modal with Validation:

- The modal form allows users to enter the following:
- Customer Name (text input)
    - Sport Name (dropdown)
    - Date (date picker)
    - Time Slot (dropdown, formatted as 1 AM - 2 AM)
    - Check Availability Button: Enabled only when required fields are filled.
- Court Selection Dropdown: Displays available courts based on  the selected slot.
- Create Booking Button: Activated only when a court is selected.

#### Responsive Design:

- The layout adapts for smaller screens with scrollable grids.
- Sidebar navigation includes additional sections for better usability.

### Example Usage
#### Open the Application:
- Access the frontend at http://localhost:3000.
#### View the Schedule:
- Select a sport and date to view court availability.
#### Create a Booking:

1. Click on + New Booking to open the modal.
2. Fill in the required fields and check for available courts.
3. Confirm the booking and see it reflect immediately on the schedule grid.

### Conclusion
This Schedule Management Application provides an easy way to manage bookings for multiple sports courts
