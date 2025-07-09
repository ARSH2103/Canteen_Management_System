import React, { useEffect, useState } from 'react';
import axios from 'axios';


const ViewEmployeePage = () => {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/users');
        setEmployees(res.data);
      } catch (err) {
        console.error('Error fetching employees:', err);
      }
    };

    fetchEmployees();
  }, [page]);

  const handlePrev = () => {
    if (page > 1) setPage(prev => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(prev => prev + 1);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-green-600 text-center">View Employees</h2>

      <table className="w-full border rounded shadow bg-white text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">UserName</th>
            <th className="p-2">Employee ID</th>
            <th className="p-2">Email</th>
            <th className="p-2">Department</th>
            <th className="p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr><td colSpan="6" className="p-4 text-center">No employees found</td></tr>
          ) : (
            employees.map(emp => (
              <tr key={emp.id} className="border-t">
                <td className="p-2">{emp.id}</td>
                <td className="p-2">{emp.username}</td>
                <td className="p-2">{emp.employeeId}</td>
                <td className="p-2">{emp.email}</td>
                <td className="p-2">{emp.department}</td>
                <td className="p-2">{emp.role}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="px-4 py-1 bg-white rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>{totalPages}</span>

        <button
          onClick={handleNext}
          disabled={page === limit}
          className="px-4 py-1 bg-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ViewEmployeePage;
