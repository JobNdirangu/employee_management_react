# MaziwaSync Employee Management System

A simple Employee Management System built using **React + Vite + Tailwind CSS + React Router + Axios** and designed to consume a Django REST Framework API.

---

# Features

* Create Employees
* View Employees
* Update Employees
* Delete Employees
* Create Departments
* View Departments
* Assign Employees to Departments
* Responsive UI using Tailwind CSS
* Client-side Routing using React Router
* Bootstrap Icons integration
* API consumption using Axios

---

# Technologies Used

## Frontend

* React
* Vite
* Tailwind CSS
* React Router DOM
* Axios
* Bootstrap Icons

## Backend

* Django
* Django REST Framework (DRF)

---

# Project Setup

## Step 1: Create a React Vite Project

```bash
npm create vite@latest employee-mgt
```

Choose:

```text
Framework: React
Variant: JavaScript
```

Move into the project:

```bash
cd employee-mgt
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

---

# Step 2: Install Tailwind CSS

Install Tailwind:

```bash
npm install tailwindcss @tailwindcss/vite
```

Update:

## vite.config.js

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

Import Tailwind inside:

## src/index.css

```css
@import "tailwindcss";
```

---

# Step 3: Install Required Packages

## React Router

```bash
npm install react-router-dom
```

## Axios

```bash
npm install axios
```

## Bootstrap Icons

```bash
npm install bootstrap-icons
```

Import Bootstrap Icons inside App.jsx:

```javascript
import "bootstrap-icons/font/bootstrap-icons.css";
```

---

# Project Structure

```text
src
│
├── components
│   ├── AddDepartment.jsx
│   ├── GetDepartment.jsx
│   ├── AddRegisterEmployee.jsx
│   ├── GetEmployees.jsx
│   └── EditEmployee.jsx
│
├── App.jsx
├── main.jsx
├── App.css
└── index.css
```

---

# Setting Up Routing

The application uses BrowserRouter and React Router for navigation.

## Routes

| Route             | Component           | Purpose            |
| ----------------- | ------------------- | ------------------ |
| /                 | GetEmployees        | View all employees |
| /addemployee      | AddRegisterEmployee | Create employee    |
| /editemployee/:id | EditEmployee        | Update employee    |
| /getdepartment    | GetDepartment       | View departments   |
| /adddepartment    | AddDepartment       | Create department  |

Example:

```jsx
<Routes>
  <Route path="/" element={<GetEmployees />} />
  <Route path="/addemployee" element={<AddRegisterEmployee />} />
  <Route path="/editemployee/:id" element={<EditEmployee />} />
  <Route path="/adddepartment" element={<AddDepartment />} />
  <Route path="/getdepartment" element={<GetDepartment />} />
</Routes>
```

---

# Navigation

The application uses Link components for client-side navigation.

Example:

```jsx
<Link to="/">Employees</Link>

<Link to="/addemployee">
  New Employee
</Link>

<Link to="/getdepartment">
  Departments
</Link>

<Link to="/adddepartment">
  New Department
</Link>
```

---

# Employee Module

## Add Employee

The Add Employee page allows users to:

* Enter First Name
* Enter Last Name
* Enter Email Address
* Select Department
* Save Employee

Concepts used:

* useState
* useEffect
* Controlled Components
* Axios POST Requests
* Dynamic Select Options
* Form Validation

```jsx
import { useState } from "react";
import axios from "axios";

const AddDepartment = () => {
  // form state matching your Django Department model schema
  const [name, setName] = useState("");

  // extra UI feedback states
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading("Creating department...");
    setSuccess("");
    setError("");

    try {
      //  Teaching Point: Django REST Framework's DefaultRouter 
      // expects data sent to the trailing slash endpoint: /departments/
      const payload = { name: name };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/departments/",
        payload
      );

      console.log(response);

      setLoading("");
      setSuccess(`Department "${response.data.name}" created successfully!`);
      
      // clear text input cleanly
      setName("");
    } catch (err) {
      setLoading("");
      // Safely catch validation errors returned by DRF or fallback to generic message
      const serverErrorMessage = err.response?.data?.name?.[0] || err.message;
      setError(serverErrorMessage);
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-sm border border-gray-100 space-y-4"
      >
        <div className="border-b border-gray-100 pb-2">
          <h2 className="text-xl font-bold text-gray-800">Add Department</h2>
          <p className="text-xs text-gray-400 mt-0.5">Create a new organizational category for employees.</p>
        </div>

        {/* Dynamic Status Alert banners */}
        {loading && <p className="text-sm font-medium text-indigo-500 animate-pulse"> {loading}</p>}
        {success && <p className="text-sm font-medium text-emerald-600 bg-emerald-50 p-2.5 rounded-lg border border-emerald-100"> {success}</p>}
        {error && <p className="text-sm font-medium text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-100"> Error: {error}</p>}

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Department Name
          </label>
          <input
            type="text"
            placeholder="e.g. Operations, Quality Assurance, Procurement"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-200 p-2.5 text-sm rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-2.5 text-sm font-medium rounded-lg hover:bg-indigo-700 shadow-xs cursor-pointer transition duration-150"
        >
          Save Department
        </button>
      </form>
    </div>
  );
};

export default AddDepartment;

```

Example payload:

```javascript
{
  first_name: "John",
  last_name: "Doe",
  email: "john@gmail.com",
  department_id: 1
}
```

---

## View Employees

The employee list page:

* Retrieves employees from Django API
* Displays data inside a table
* Shows department information
* Provides Edit and Delete actions

Concepts used:

* useEffect
* Axios GET
* Array map()
* Conditional Rendering
* Event Handlers

```jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ⚛️ For moving data to the Edit component

const GetEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate(); // Initialize client side routing control

  // Fetch employees list from Django
  const getEmployees = async () => {
    setLoading("Loading employees...");
    setError("");
    try {
      const response = await axios.get("https://milksync.alwaysdata.net/api/employees");
      setEmployees(response.data);
      console.log(response.data)
      setLoading("");
    } catch (err) {
      console.log(err);
      setError("Failed to load employees");
      setLoading("");
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  //  Handle Delete Operation
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this employee?")) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/employees/${id}`);
      //  Use your Day 2 .filter method to drop the item from UI instantly!
      setEmployees(employees.filter((emp) => emp.id !== id));
    } catch (err) {
      console.log(err);
      alert("Failed to delete employee");
    }
  };

  //  Handle Moving to Edit Component (Carrying object data along)
  const handleEditRedirect = (emp) => {
    // We send them to the edit route and pass the active employee object inside 'state'
    navigate(`/editemployee/${emp.id}`, { state: { employee: emp } });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Employees Directory</h1>
        <span className="text-xs font-semibold bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg border border-indigo-100">
          Total: {employees.length}
        </span>
      </div>

      {loading && (
        <p className="mb-3 flex items-center gap-2 text-sm font-medium text-indigo-500 animate-pulse">
          <i className="bi bi-arrow-repeat animate-spin"></i>
          {loading}
        </p>
      )}

      {error && (
        <p className="mb-3 flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 p-2.5 text-sm font-medium text-red-600">
          <i className="bi bi-exclamation-circle-fill"></i>
          {error}
        </p>
      )}

      <div className="overflow-x-auto bg-white rounded-xl border border-gray-100 shadow-xs">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-100 text-xs text-gray-700 uppercase tracking-wider border-b border-gray-200">
            <tr>
              <th className="p-4 w-16">ID</th>
              <th className="p-4">Full Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Department</th>
              <th className="p-4 text-center w-48">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {employees.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-50/50 transition duration-150">
                <td className="p-4 font-mono text-gray-400">#{emp.id}</td>
                <td className="p-4 font-semibold text-gray-900">{emp.first_name} {emp.last_name}</td>
                <td className="p-4 text-gray-500">{emp.email}</td>
                <td className="p-4 text-gray-500">{emp.department.name}</td>
                <td className="p-4 flex items-center justify-center gap-2">
                  
                  {/* Edit Action Button */}
                  <button className="flex items-center gap-1 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-600 hover:bg-indigo-100 transition cursor-pointer"
                    onClick={() => handleEditRedirect(emp)}
                  >
                    <i className="bi bi-pencil-square"></i>
                    Edit
                  </button>

                  <button className="flex items-center gap-1 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100 transition cursor-pointer"
                    onClick={() => handleDelete(emp.id)}
                  >
                    <i className="bi bi-trash3"></i>
                    Delete
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetEmployees;

```

---

## Delete Employee

Delete operation:

```javascript
await axios.delete(
  `http://127.0.0.1:8000/api/employees/${id}`
);
```

```jsx
//  Handle Delete Operation
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this employee?")) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/employees/${id}`);
      //  Use your Day 2 .filter method to drop the item from UI instantly!
      setEmployees(employees.filter((emp) => emp.id !== id));
    } catch (err) {
      console.log(err);
      alert("Failed to delete employee");
    }
  };

  //  Handle Moving to Edit Component (Carrying object data along)
  const handleEditRedirect = (emp) => {
    // We send them to the edit route and pass the active employee object inside 'state'
    navigate(`/editemployee/${emp.id}`, { state: { employee: emp } });
  };
```

After deletion:

```javascript
setEmployees(
  employees.filter((emp) => emp.id !== id)
);
```

Concept learned:

The filter() method creates a new array without the deleted employee, allowing the UI to update immediately without refreshing the page.

---

## Edit Employee

The Edit Employee page:

* Receives employee data through React Router state
* Pre-fills the form fields
* Loads departments
* Updates employee information

Example:

```javascript
navigate(
  `/editemployee/${emp.id}`,
  {
    state: {
      employee: emp
    }
  }
);
```

Update request:

```javascript
await axios.put(
  `http://127.0.0.1:8000/api/employees/${currentEmployee.id}`,
  payload
);
```

Concepts used:

* useNavigate
* useLocation
* Axios PUT
* Dynamic Form State
* Controlled Components

```jsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

const EditEmployee = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentEmployee = location.state?.employee;

  const [firstName, setFirstName] = useState(currentEmployee?.first_name || "");
  const [lastName, setLastName] = useState(currentEmployee?.last_name || "");
  const [email, setEmail] = useState(currentEmployee?.email || "");
  const [department, setDepartment] = useState(currentEmployee?.department?.id || "");

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!currentEmployee) navigate("/");
  }, [currentEmployee, navigate]);

  useEffect(() => {
    getDepartments();
  }, []);

  const getDepartments = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/departments/");
      setDepartments(res.data);
    } catch (err) {
      console.log("Failed to load departments.", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading("Updating employee...");
    setSuccess("");
    setError("");

    try {
      const payload = {
        first_name: firstName,
        last_name: lastName,
        email,
        department_id: Number(department),
      };

      await axios.put(
        `http://127.0.0.1:8000/api/employees/${currentEmployee.id}`,
        payload
      );

      setLoading("");
      setSuccess("Employee updated successfully!");

      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.log(err.response?.data);
      setLoading("");
      setError("Failed to update employee.");
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl rounded-xl border border-gray-100 bg-white p-6 shadow-sm space-y-5"
      >
        {/* Header */}
        <div className="border-b border-gray-100 pb-3">
          <h2 className="text-2xl font-bold text-gray-800">Edit Employee</h2>
          <p className="mt-1 text-xs text-gray-400">
            Employee ID: #{currentEmployee?.id}
          </p>
        </div>

        {/* Status Messages */}
        {loading && (
          <div className="flex items-center gap-2 rounded-lg border border-indigo-100 bg-indigo-50 p-3 text-sm text-indigo-600">
            <i className="bi bi-arrow-repeat animate-spin"></i>
            <span>{loading}</span>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 p-3 text-sm text-emerald-600">
            <i className="bi bi-check-circle-fill"></i>
            <span>{success}</span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-600">
            <i className="bi bi-exclamation-circle-fill"></i>
            <span>{error}</span>
          </div>
        )}

        {/* Name Fields */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
              First Name
            </label>

            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full rounded-lg border border-gray-200 p-2.5 text-sm outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
              Last Name
            </label>

            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full rounded-lg border border-gray-200 p-2.5 text-sm outline-none focus:border-indigo-500"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
            Email Address
          </label>

          <input type="email" className="w-full rounded-lg border border-gray-200 p-2.5 text-sm outline-none focus:border-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Department */}
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase text-gray-600">
            Department
          </label>

          <select
            value={department}
            onChange={(e) => setDepartment(Number(e.target.value))}
            className="w-full rounded-lg border border-gray-200 bg-white p-2.5 text-sm outline-none focus:border-indigo-500"
            required
          >
            <option value="">Select Department</option>

            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-600 p-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            <i className="bi bi-floppy"></i>
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 rounded-lg bg-gray-100 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
          >
            <i className="bi bi-x-circle"></i>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
```
---

# Department Module

## Add Department

Allows users to:

* Enter department name
* Submit data to Django API
* Receive success or error feedback

Example payload:

```javascript
{
  name: "Operations"
}
```


Concepts used:

* useState
* Axios POST
* Form Validation
* Conditional Rendering

```jsx
import { useState } from "react";
import axios from "axios";

const AddDepartment = () => {
  // form state matching your Django Department model schema
  const [name, setName] = useState("");

  // extra UI feedback states
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading("Creating department...");
    setSuccess("");
    setError("");

    try {
      // ⚛️ Teaching Point: Django REST Framework's DefaultRouter 
      // expects data sent to the trailing slash endpoint: /departments/
      const payload = { name: name };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/departments/",
        payload
      );

      console.log(response);

      setLoading("");
      setSuccess(`Department "${response.data.name}" created successfully!`);
      
      // clear text input cleanly
      setName("");
    } catch (err) {
      setLoading("");
      // Safely catch validation errors returned by DRF or fallback to generic message
      const serverErrorMessage = err.response?.data?.name?.[0] || err.message;
      setError(serverErrorMessage);
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-sm border border-gray-100 space-y-4"
      >
        <div className="border-b border-gray-100 pb-2">
          <h2 className="text-xl font-bold text-gray-800">Add Department</h2>
          <p className="text-xs text-gray-400 mt-0.5">Create a new organizational category for employees.</p>
        </div>

        {/* Dynamic Status Alert banners */}
        {loading && <p className="text-sm font-medium text-indigo-500 animate-pulse">⏳ {loading}</p>}
        {success && <p className="text-sm font-medium text-emerald-600 bg-emerald-50 p-2.5 rounded-lg border border-emerald-100">✅ {success}</p>}
        {error && <p className="text-sm font-medium text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-100">❌ Error: {error}</p>}

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Department Name
          </label>
          <input
            type="text"
            placeholder="e.g. Operations, Quality Assurance, Procurement"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-200 p-2.5 text-sm rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-2.5 text-sm font-medium rounded-lg hover:bg-indigo-700 shadow-xs cursor-pointer transition duration-150"
        >
          Save Department
        </button>
      </form>
    </div>
  );
};

export default AddDepartment;

```

---

## View Departments

Displays departments as cards.

Features:

* Department count
* Loading indicators
* Error handling
* Responsive grid layout

Concepts used:

* useEffect
* Axios GET
* CSS Grid
* Array map()
* Conditional Rendering

```jsx
import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const GetDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  const getDepartments = async () => {
    setLoading("Loading departments...");
    setError("");

    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/departments/"
      );

      console.log(response);
      setDepartments(response.data);
      setLoading("");
    } catch (err) {
      console.log(err);
      setLoading("");
      setError("Failed to load departments.");
    }
  };

  useEffect(() => {
    getDepartments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          Departments
        </h1>

        <span className="rounded-lg border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600">
          Total: {departments.length}
        </span>
      </div>

      {loading && (
        <p className="mb-4 flex items-center gap-2 text-sm font-medium text-indigo-500 animate-pulse">
          <i className="bi bi-arrow-repeat animate-spin"></i>
          {loading}
        </p>
      )}

      {error && (
        <p className="mb-4 flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 p-2.5 text-sm font-medium text-red-600">
          <i className="bi bi-exclamation-circle-fill"></i>
          {error}
        </p>
      )}

      {departments.length === 0 && !loading ? (
        <div className="rounded-xl border border-gray-100 bg-white p-10 text-center text-gray-400">
          No departments found.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {departments.map((dept) => (
            <div
              key={dept.id}
              className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <i className="bi bi-building text-lg"></i>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    Department
                  </p>

                  <h2 className="text-lg font-semibold text-gray-800">
                    {dept.name}
                  </h2>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3">
                <p className="text-xs text-gray-400">
                  Department ID
                </p>

                <p className="mt-1 font-mono text-sm text-gray-600">
                  #{dept.id}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetDepartment;
```

---

# API Endpoints

## Departments

```text
GET    /api/departments/
POST   /api/departments/
```

## Employees

```text
GET     /api/employees
POST    /api/employees
PUT     /api/employees/:id
DELETE  /api/employees/:id
```

---

# React Concepts Covered

* Components
* JSX
* Props
* State Management
* useState
* useEffect
* Event Handling
* Forms
* Controlled Inputs
* Conditional Rendering
* List Rendering
* Routing
* Navigation
* Axios API Calls
* CRUD Operations
* Component Composition

---

# Running the Project

Start the frontend:

```bash
npm run dev
```

Start the Django backend:

```bash
python manage.py runserver
```

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://127.0.0.1:8000
or 
https://username.alwaysdata.net/
```

---

# Learning Outcomes

After completing this project, a student should be able to:

1. Create React applications using Vite.
2. Configure Tailwind CSS.
3. Use React Router for navigation.
4. Consume REST APIs using Axios.
5. Build reusable React components.
6. Manage component state with Hooks.
7. Perform CRUD operations.
8. Build responsive user interfaces.
9. Integrate React with Django REST Framework.
10. Structure medium-sized React applications using components and routing.
