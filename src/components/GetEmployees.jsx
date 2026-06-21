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
      const response = await axios.get("http://127.0.0.1:8000/api/employees");
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
