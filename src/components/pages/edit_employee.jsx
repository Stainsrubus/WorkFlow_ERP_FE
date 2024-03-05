import React, { useState, useEffect } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import AxiosService from "../utils/ApiService";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Edit_employee() {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "",
    image: "",
  });
  const [file, setFile] = useState(null);
  const [isFormAltered, setIsFormAltered] = useState(false);

  useEffect(() => {
    const fetchEmployeeById = async () => {
      try {
        const res = await AxiosService.get(
          `/employee/getemployees/${employeeId}`
        );
        if (res.status === 200) {
          const employeeData = res.data.employee;
          setEmployee(employeeData);
        }
      } catch (error) {
        console.error(error);
        console.log("Failed to fetch employee");
      }
    };

    if (employeeId) {
      fetchEmployeeById();
    }
  }, [employeeId]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", employee.name);
      formData.append("email", employee.email);
      formData.append("mobile", employee.mobile);
      formData.append("designation", employee.designation);
      formData.append("gender", employee.gender);
      formData.append("course", employee.course);
      
      if (file) {
        formData.append("image", file);
      }
  

      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      const res = await AxiosService.put(
        `/employee/editemployee/${employeeId}`,
        formData,
        config
      );
      if (res.status === 200) {
        console.log("Employee updated successfully");
        setIsFormAltered(false);
        navigate(`/employee_list`);
      }
    } catch (error) {
      console.error(error);
      console.log("Failed to update employee");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
    setIsFormAltered(true);
  };

  const handleImageUpload = (e) => {
    setFile(e.target.files[0]);
    setIsFormAltered(true);
  };

  return (
    <div className="mt-20">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Edit Employee</h1>
      </div>
      <div className="flex justify-center">
        <div className="w-1/2 mt-10 border border-blue-200 rounded-lg shadow-lg shadow-blue-300">
          <Form className="px-10 py-10" onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label> Name :</Form.Label>
              <Form.Control
                className="input-box border w-full border-blue-300 rounded-md outline-transparent focus:shadow-md focus:shadow-blue-500"
                type="text"
                placeholder="Enter Name "
                name="name"
                value={employee.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email :</Form.Label>
              <Form.Control
                className="input-box border w-full border-blue-300 rounded-md outline-transparent focus:shadow-md focus:shadow-blue-500"
                type="email"
                name="email"
                value={employee.email}
                placeholder="Enter Email"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mobile :</Form.Label>
              <Form.Control
                className="input-box border w-full border-blue-300 rounded-md outline-transparent focus:shadow-md focus:shadow-blue-500"
                type="text"
                name="mobile"
                value={employee.mobile}
                placeholder="Enter Mobile"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Designation :</Form.Label>
              <Form.Select
                className="input-box border w-full border-blue-300 rounded-md outline-transparent focus:shadow-md focus:shadow-blue-500"
                defaultValue="--"
                name="designation"
                value={employee.designation}
                onChange={handleInputChange}
              >
                <option value="" disabled selected>
                  --
                </option>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gender :</Form.Label>
              <div className="flex">
                <Form.Check
                  inline
                  label="Male"
                  name="gender"
                  type="radio"
                  id="male"
                  value="Male"
                  className="mx-2"
                  checked={employee.gender === "Male"}
                  onChange={handleInputChange}
                />
                <Form.Check
                  inline
                  label="Female"
                  name="gender"
                  type="radio"
                  id="female"
                  value="Female"
                  className="mx-2"
                  checked={employee.gender === "Female"}
                  onChange={handleInputChange}
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Course :</Form.Label>
              <Form.Select
                className="input-box border w-full border-blue-300 rounded-md outline-transparent focus:shadow-md focus:shadow-blue-500"
                name="course"
                defaultValue="--"
                value={employee.course}
                onChange={handleInputChange}
              >
                <option value="" disabled selected>
                  --
                </option>
                <option value="MCA">MCA</option>
                <option value="BCA">BCA</option>
                <option value="Sales">Sales</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Img Upload :</Form.Label>
              <Form.Control
                type="file"
                className="form-control"
                accept=".jpg, .jpeg, .png"
                id="imageUpload"
                name="image"
                onChange={handleImageUpload}
              />
              {employee.image && (
                <img
                  src={
                    employee.image.startsWith("http")
                      ? employee.image
                      : `/${employee.image}`
                  }
                  alt="Employee"
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              )}{" "}
            </Form.Group>
            <div className="flex justify-end mt-5">
              <Button
                className="btn border bg-blue-500 px-1 py-1 rounded-md font-bold border-blue-950"
                variant="primary"
                type="submit"
                disabled={!isFormAltered}
              >
                Update
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
export default Edit_employee;
