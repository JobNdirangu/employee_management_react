import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

const AddRegisterEmployee = () => {
  // form states
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");

  // extra UI states
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // fetch departments
  const getDepartments = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/departments/");
      setDepartments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDepartments();
  }, []);

  // submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading("Saving employee...");
    setSuccess("");
    setError("");

    try {
      const payload = {
        first_name,
        last_name,
        email,
        department_id:department,
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/employees",
        payload
      );

      console.log(response);

      setLoading("");
      setSuccess(`Employee ${response.data.first_name} created successfully!`);

      setFirstName("");
      setLastName("");
      setEmail("");
      setDepartment("");
    } catch (err) {
      setLoading("");
      setError(err.message);
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl rounded-xl bg-white p-6 shadow-sm border border-gray-100 space-y-4"
      >
        <div className="border-b border-gray-100 pb-2">
          <h2 className="text-xl font-bold text-gray-800">Add Employee</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Register a new employee and assign them to a department.
          </p>
        </div>

        {/* Dynamic Status Alert banners */}
        {loading && (
          <p className="text-sm font-medium text-indigo-500 animate-pulse flex items-center gap-2">
            <i className="bi bi-arrow-repeat animate-spin"></i>
            {loading}
          </p>
        )}

        {success && (
          <p className="text-sm font-medium text-emerald-600 bg-emerald-50 p-2.5 rounded-lg border border-emerald-100 flex items-center gap-2">
            <i className="bi bi-check-circle-fill"></i>
            {success}
          </p>
        )}

        {error && (
          <p className="text-sm font-medium text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-100 flex items-center gap-2">
            <i className="bi bi-exclamation-circle-fill"></i>
            Error: {error}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
              First Name
            </label>
            <input
              type="text"
              placeholder="Enter first name"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border border-gray-200 p-2.5 text-sm rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Enter last name"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border border-gray-200 p-2.5 text-sm rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Email Address
          </label>
          <input
            type="email"
            placeholder="employee@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-200 p-2.5 text-sm rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Department
          </label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full border border-gray-200 p-2.5 text-sm rounded-lg bg-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition"
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

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-2.5 text-sm font-medium rounded-lg hover:bg-indigo-700 shadow-xs cursor-pointer transition duration-150"
        >
          Save Employee
        </button>
      </form>
    </div>
  );
};

export default AddRegisterEmployee;