// import logo from './logo.svg';
import './App.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import AddRegisterEmployee from './components/AddRegisterEmployee';
import GetEmployees from './components/GetEmployees';
import AddDepartment from './components/AddDepartment';
import GetDepartment from './components/GetDepartment';
import EditEmployee from './components/EditEmployee';

function App() {
  return (
    <BrowserRouter>
      {/* 💻 Clean, root-level layout grid for the entire application */}
      <div className="min-h-screen bg-gray-50 text-gray-700 font-sans flex flex-col">
        
        {/* Navigation bar header container */}
        <header className="bg-slate-900 shadow-sm border-b border-slate-800 p-4">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Minimalist modern branding title */}
            <h1 className="text-xl font-bold tracking-tight text-white">
              <span className="text-indigo-400 font-extrabold">MaziwaSync</span> <span className="text-gray-300 font-light text-sm ml-1">EmployeeMgt</span>
            </h1>
            
            {/* ⚛️ Soft, rounded modern button styles */}
            <nav className="flex items-center gap-2 text-xs font-semibold">
              <Link
                to="/"
                className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-slate-100 transition duration-150 hover:bg-slate-700"
              >
                <i className="bi bi-people-fill"></i>
                Employees
              </Link>

              <Link
                to="/addemployee"
                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white shadow-sm transition duration-150 hover:bg-indigo-500"
              >
                <i className="bi bi-person-plus-fill"></i>
                New Employee
              </Link>

              <Link
                to="/getdepartment"
                className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-slate-100 transition duration-150 hover:bg-slate-700"
              >
                <i className="bi bi-building"></i>
                Departments
              </Link>

              <Link
                to="/adddepartment"
                className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-white shadow-sm transition duration-150 hover:bg-emerald-500"
              >
                <i className="bi bi-building-add"></i>
                New Dept
              </Link>
            </nav>

          </div>        
        </header>

        {/* 📊 Dynamic workspace container where all component pages render */}
        <main className="flex-1 max-w-6xl w-full mx-auto p-6">
          <Routes>
            <Route path='/' element={<GetEmployees />} />
            <Route path='/addemployee' element={<AddRegisterEmployee />} />
            <Route path='/editemployee/:id' element={<EditEmployee />} />
            <Route path='/adddepartment' element={<AddDepartment />} />
            <Route path='/getdepartment' element={<GetDepartment />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;
