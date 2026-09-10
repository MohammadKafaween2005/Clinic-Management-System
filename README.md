# Clinic Management System

Frontend application for the **Dr. Hani Kafaween Clinic Management System**.

The application provides a public clinic website together with separate dashboards for doctors, receptionists, and patients. It connects to the clinic backend through REST API requests.

## Technologies Used

- React
- Vite
- React Router
- Axios
- Bootstrap
- CSS
- Local Storage

## Main Features

- Public clinic home page
- Clinic services, about, contact, and location sections
- User login
- Patient account registration
- Role-based dashboards for doctors, receptionists, and patients
- Protected routes based on user role
- Appointment booking and rescheduling
- Appointment management
- Patient management
- Medical record viewing and creation
- User profile pages
- Responsive layouts
- Third-party Quote of the Day API
- Bootstrap components

## User Roles

The system supports three user roles:

```text
doctor
receptionist
patient
```

After login, each user is redirected to the appropriate dashboard.

### Doctor

The doctor dashboard allows the doctor to:

- View the dashboard overview
- View today's appointments
- View and manage the appointment schedule
- View patients
- View patient medical records
- Add medical records
- View doctor profile information

### Receptionist

The receptionist dashboard allows the receptionist to:

- View the dashboard overview
- View and manage appointments
- Register patients
- View and update patient information
- Create new appointments
- View patient profiles
- View receptionist profile information

### Patient

The patient dashboard allows patients to:

- View their dashboard
- View their appointments
- Book appointments
- Reschedule appointments
- Cancel appointments
- View their profile information

## Project Structure

```text
src/
├── assets/
├── components/
│   ├── doctorcomponents/
│   ├── patientcomponents/
│   ├── receptionistcomponents/
│   └── sharedcomponents/
├── context/
├── pages/
├── App.css
├── App.jsx
├── index.css
└── main.jsx
```

## Environment Variables

Create a `.env` file in the root of the frontend project.

Use `.env.sample` as a reference:

```env
VITE_API_URL=http://localhost:5000
```

`VITE_API_URL` is the base URL of the backend API.

For local development:

```env
VITE_API_URL=http://localhost:5000
```

When deploying the application, replace it with the deployed backend URL.

The real `.env` file should not be committed to Git.

## Installation

Clone the repository:

```bash
git clone https://github.com/MohammadKafaween2005/Clinic-Management-System.git
```

Enter the project directory:

```bash
cd Clinic-Management-System
```

Install the dependencies:

```bash
npm install
```

Create a `.env` file using `.env.sample` and make sure the backend server is running.

## Running the Application

Start the Vite development server:

```bash
npm run dev
```

Vite will display the local frontend URL in the terminal.

## Build

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Main Routes

| Route | Description |
| --- | --- |
| `/` | Public clinic home page |
| `/Login` | Login and patient registration |
| `/Doctor` | Doctor dashboard |
| `/Receptionist` | Receptionist dashboard |
| `/Patient` | Patient dashboard |
| `/BookAppointment` | Public appointment booking page |

## API Connection

The application uses Axios to communicate with the backend.

Example:

```js
axios.get(`${import.meta.env.VITE_API_URL}/api/appointments`);
```

Using `VITE_API_URL` prevents the backend URL from being hardcoded throughout the application and makes deployment easier.

## Authentication and Protected Routes

After a successful login, basic user information is stored in local storage:

```js
localStorage.setItem("user", JSON.stringify(user));
```

The application uses a `ProtectedRoute` component to restrict dashboard access according to the logged-in user's role.

For example:

```jsx
<ProtectedRoute allowedRole="doctor">
  <Doctor />
</ProtectedRoute>
```

Users without the required role are redirected to the login page.

## Context API

React Context is used to manage navigation between sections inside the role dashboards.

The project includes:

```text
DoctorContext
PatientContext
ReceptionistContext
```

Each context allows its dashboard components to change the currently displayed section without creating separate browser routes for every dashboard view.

## Bootstrap

Bootstrap is imported in `main.jsx`:

```js
import "bootstrap/dist/css/bootstrap.min.css";
```

Bootstrap components and utility classes are used together with the project's custom CSS.

The Services section uses Bootstrap badges such as:

```jsx
<span className="badge bg-success">Popular</span>
```

## Third-Party API

The public website includes a Quote of the Day section using the DummyJSON Quotes API.

Example request:

```js
axios.get("https://dummyjson.com/quotes/random");
```

This API is separate from the clinic backend and does not use `VITE_API_URL`.

## Backend

This frontend works with the Clinic Management System backend:

https://github.com/MohammadKafaween2005/Clinic-Management-System-Server

The backend provides the APIs for:

- Authentication
- Patients
- Appointments
- Medical records
- User profiles

## Repository

Frontend repository:

https://github.com/MohammadKafaween2005/Clinic-Management-System
