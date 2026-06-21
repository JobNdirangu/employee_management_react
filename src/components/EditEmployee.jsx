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