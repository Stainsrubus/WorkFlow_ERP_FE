import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AxiosService from '../utils/ApiService';
import { Navigate } from 'react-router-dom';

function Create_employee() {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [mobile,setMobile]=useState('');
    const [password,setPassword]=useState('');
    const [gender,setGender]=useState('');
    const [designation,setDesignation]=useState('');
    const [course,setCourse]=useState('');
    const [image,setImage]=useState('');
    const [isCreated, setIsCreated] = useState(false);

    const handleCreate = async (e) => {
      e.preventDefault();
        if (!email || !designation || !name || !mobile || !gender || !course || !image) {
            console.log('Please fill all the fields');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('mobile', mobile);
            formData.append('email', email);
            formData.append('designation', designation);
            formData.append('gender', gender);
            formData.append('course', course);
            formData.append('password', password);
            formData.append('image', image);

            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };

            const res = await AxiosService.post(`/employee/create`, formData, config);

            if (res.status === 201) {
                console.log(res.data.message);
                setName('');
                setMobile('');
                setEmail('');
                setDesignation('');
                setGender('');
                setCourse('');
                setPassword('');
                setImage('');
                setIsCreated(true); 
            }
        } catch (error) {
            console.log(error.response?.data?.message || 'Failed to create user');
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileNameParts = file.name.split('.');
            const fileExtension = fileNameParts[fileNameParts.length - 1];
            if (fileExtension !== 'jpg' && fileExtension !== 'jpeg' && fileExtension !== 'png') {
                alert('Only JPEG and PNG files are allowed.');
                e.target.value = null;
                return;
            }
            setImage(file);
        }
    };


  return <>
  {isCreated ? (
        <Navigate to="/employee_list" replace={true} />
      ) : (
    <div className='mt-20'>
      <div className='text-center'>
        <h1 className='text-2xl font-bold'>Create Employee</h1>
      </div>
      <div className='flex justify-center'>
        <div className="w-1/2 mt-10 border border-blue-200 rounded-lg shadow-lg shadow-blue-300">
          <Form className='px-10 py-10' >
            <Form.Group className="mb-3">
              <Form.Label> Name :</Form.Label>
              <Form.Control
                className="input-box border w-full border-blue-300 rounded-md outline-transparent focus:shadow-md focus:shadow-blue-500"
                type="text"
                name='name'
                
                placeholder="Enter Name "
                onChange={(e)=>setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                className="input-box border w-full border-blue-300 rounded-md outline-transparent focus:shadow-md focus:shadow-blue-500"
                type="email"
                name='email'
               
                placeholder="Ex: xxx@example.com"
                onChange={(e)=>setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mobile :</Form.Label>
              <Form.Control
                className="input-box border w-full border-blue-300 rounded-md outline-transparent focus:shadow-md focus:shadow-blue-500"
                type="text"
                name='mobile'
                
                placeholder="Ex: 92xxxxxx89"
                onChange={(e)=>setMobile(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
    <Form.Label>Designation :</Form.Label>
    <Form.Select
        className="input-box border w-full border-blue-300 rounded-md outline-transparent focus:shadow-md focus:shadow-blue-500"
        defaultValue="--"
        name='designation'
        onChange={(e)=>setDesignation(e.target.value)}
    >
        <option value="" disabled>--</option>
        <option value="HR">HR</option>
        <option value="Manager">Manager</option>
        <option value="Sales">Sales</option>
    </Form.Select>
</Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gender :</Form.Label>
              <div className='flex'>
                <Form.Check
                  inline
                  label="Male"
                  name="gender"
                  type="radio"
                  id="male"
                  value="Male"
                  className="mx-2"
                  onChange={(e)=>setGender(e.target.value)}
                />
                <Form.Check
                  inline
                  label="Female"
                  name="gender"
                  type="radio"
                  id="female"
                  value="Female"
                  className="mx-2"
                  onChange={(e)=>setGender(e.target.value)}
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Course :</Form.Label>
              <Form.Select
                className="input-box border w-full border-blue-300 rounded-md outline-transparent focus:shadow-md focus:shadow-blue-500"
                name='course'
                defaultValue="--"
                onChange={(e)=>setCourse(e.target.value)}
              >
                <option value="" disabled>--</option>
                <option value="MCA">MCA</option>
                <option value="BCA">BCA</option>
                <option value="Sales">Sales</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password :</Form.Label>
              <Form.Control
                className="input-box border w-full border-blue-300 rounded-md outline-transparent focus:shadow-md focus:shadow-blue-500"
                type="password"
                name='password'
               
                placeholder="Enter password"
                onChange={(e)=>setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Img Upload :</Form.Label>
              <Form.Control
                type="file"
                className="form-control"
                accept=".jpg, .jpeg, .png"
                id="imageUpload"
                name='image'
                onChange={handleImageUpload}
              />
            </Form.Group>

            <div className="flex justify-end mt-5">
              <Button
                className="btn border bg-blue-500 px-1 py-1 rounded-md font-bold border-blue-950"
                variant="primary"
                type="submit"
                onClick={handleCreate}
              >
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
      )}
    </>
}


export default Create_employee;
