import React, { useEffect, useState } from 'react';
import AxiosService from '../utils/ApiService';
import { useNavigate } from 'react-router-dom';

function Employee_list() {
  const [employeesData, setEmployeesData] = useState([]);

  const getallemployees = async () => {
    try {
      let res = await AxiosService.get('/employee/getallemployees'); 
      console.log(res);
      if (res.status === 200) {
        const fetchedEmployees = res.data.employees || [];
        setEmployeesData(fetchedEmployees); // Update state with fetched data
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleDeleteEmployee = async (employeeId) => {
    try {
      let res = await AxiosService.delete(`/employee/deleteemployee/${employeeId}`);
      if (res.status === 200) {
        console.log('Employee deleted successfully');
        getallemployees(); // Refresh employee list after deletion
      }
    } catch (error) {
      console.error('Failed to delete employee:', error);
    }
  };

  useEffect(() => {
    getallemployees(); 
  }, []);

  const navigate = useNavigate();

  const renderEmployeeTable = () => (
    <div className='px-10'>
      <table className='text-center table-auto w-full'>
        <thead>
          <tr>
            <th className='px-2 py-4'>Unique Id</th>
            <th className='px-2 py-4'>Image</th>
            <th className='px-2 py-4'>Name</th>
            <th className='px-2 py-4'>Email</th>
            <th className='px-2 py-4'>Mobile No</th>
            <th className='px-2 py-4'>Designation</th>
            <th className='px-2 py-4'>Gender</th>
            <th className='px-2 py-4'>Course</th>
            <th className='px-2 py-4'>Create date</th>
            <th className='px-2 py-4'>Action</th>
          </tr>
        </thead>
        <tbody>
          {employeesData.map((employee, index) => (
            <tr key={employee._id}>
              <td>{index + 1}</td>
              <td>
              {employee.image && (
                <img
                  src={employee.image} 
                  alt={`Image of ${employee.name}`} 
                  className="w-28 h-20 bg-red-50" 
                />
              )}
            </td>              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.mobile}</td>
              <td>{employee.designation}</td>
              <td>{employee.gender}</td>
              <td>{employee.course}</td>
              <td>{new Date(employee.createdAt).toLocaleDateString()}</td>
              <td>
                <button className='border-lg text-center bg-green-200 rounded-full px-1 py-1' onClick={() => navigate(`/edit_employee/${employee._id}`)}>
                  <i className="fa-solid fa-user-pen"></i>
                </button>
                <button onClick={() => handleDeleteEmployee(employee._id)} className='border-lg text-center bg-red-200 rounded-full px-2 py-1'>
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </td>
            </tr>  
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className='mt-20'>
      <div className='flex justify-between'>
        <h1 className='px-10 pb-10 text-2xl font-bold'>
          Employee list
        </h1>
        <div className='px-10'>
          <button className='bg-blue-500 h-8 w-auto px-2 text-white border-blue-800 border rounded-md' onClick={() => navigate(`/create_employee`)}>
            Create Employee
          </button>
        </div>
      </div>
      <div>
        {renderEmployeeTable()}
      </div>
    </div>
  );
}

export default Employee_list;
