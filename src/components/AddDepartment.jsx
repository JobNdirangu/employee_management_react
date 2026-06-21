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
