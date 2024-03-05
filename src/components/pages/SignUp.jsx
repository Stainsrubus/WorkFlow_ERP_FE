import React from 'react'
import bg from '../../assets/login-bg.jpeg'
import logo from '../../assets/company_logo.png'
import { Form,Button } from 'react-bootstrap'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function SignUp() {
    let [email,setEmail] = useState("")
    let [password,setPassword] = useState("")
    let navigate = useNavigate()

    const handleLogin = async(event)=>{
        event.preventDefault(); 
        if (!email || !password) {
          console.log('Please fill all the fields');
          return; 
        }
        try {
          let res = await AxiosService.post(`/employee/login`,{
            email,
            password
          })
      
          if(res.status===200)
          {
            sessionStorage.setItem('token',res.data.token)
            sessionStorage.setItem('employeeData',JSON.stringify(res.data.employeeData))
            
            if(res.data.employeeData.designation === 'HR')
            {
                navigate('/admin_dashboard')
            }
            else
            {
                navigate('/')
            }
          }
        } catch (error) {
          {error}
        }
      }


  return (
    <>
    <div className=' w-screen absolute h-screen bg-custom-bg bg-cover blur-[5px]'>
      
    </div>
    <div className='flex flex-col h-screen justify-center items-center relative'> 
    <div className='w-3/4 absolute'>
    <div className='  gap-5  h-[550px] mt-10 border border-blue-200 rounded-lg shadow-lg shadow-blue-300 text-white flex' >
    <div className='flex flex-col gap-5 items-center w-1/2 justify-center'>
      <img className='login-brand' src={logo} alt='Logo' />
      <h1 className='font-pacifico text-5xl'>Workflow</h1>
    </div>
    <div className='flex flex-col gap-5 pt-2 w-1/2' >
    <h1 className='text-center text-lg font-bold pt-2'>Create New Account</h1>
    <Form className='px-5 '>
                <Form.Group className="mb-3">
                  <Form.Control
                    className="input-box border w-full border-blue-300 rounded-md outline-transparent focus:shadow-md focus:shadow-blue-500"
                    type="text"
                    placeholder="Enter First Name "
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    className="input-box border w-full border-blue-300 rounded-md outline-transparent focus:shadow-md focus:shadow-blue-500"
                    type="email"
                    placeholder="Ex: xxx@example.com"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    className="input-box border w-full border-blue-300 rounded-md outline-transparent focus:shadow-md focus:shadow-blue-500"
                    type="text"
                    placeholder="Ex: 92xxxxxx89"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Designation :</Form.Label>
                  <Form.Select
    className="input-box border w-full border-blue-300 text-black rounded-md outline-transparent focus:shadow-md focus:shadow-blue-500"
    defaultValue=""
 >
    <option value="" disabled selected>--</option> 
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
      className="mx-2"
    />
    <Form.Check
      inline
      label="Female"
      name="gender"
      type="radio"
      id="female"
      className="mx-2"
    />
  </div>
</Form.Group>
<Form.Group className="mb-3 ">
                  <Form.Label>Course :</Form.Label>
                  <Form.Select
    className="input-box border w-full border-blue-300 rounded-md text-black outline-transparent focus:shadow-md focus:shadow-blue-500"
    defaultValue=""
 >
    <option value="" disabled selected>--</option> 
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
    onChange={(e) => handleImageUpload(e)}
  />
</Form.Group>

                <div className="flex justify-center mt-5">
                  <Button
                    className="btn border bg-blue-500 px-1 py-1 rounded-md font-bold border-blue-950"
                    variant="primary"
                  >
                    SignUp
                  </Button>
                  
                </div>
                <div className='flex pt-5'>
      <p className='text-center'>Already have an account? </p> 
      <Link to="/sign-in" className='font-black '> ꧁ SignIn ꧂ </Link>
      </div>
              </Form>
  </div>
  </div>
        </div>   
  
     </div>
    </>
  )
}

export default SignUp
