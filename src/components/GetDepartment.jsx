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