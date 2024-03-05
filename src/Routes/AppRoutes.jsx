import React from "react";
import Header from "../components/utils/header.jsx";
import Admin_dashboard from "../components/pages/admin_dashboard";
import Create_employee from "../components/pages/create_employee";
import Edit_employee from "../components/pages/edit_employee";
import Employee_list from "../components/pages/employee_list";
import { Route,Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import SignIn from "../components/pages/SignIn.jsx";
import SignUp from "../components/pages/SignUp.jsx";
function AppRoutes() {
  return (
    <>
      
      <Routes>
        <Route
          path="/admin_dashboard"
          element={
            <>
              <Header />
              <Admin_dashboard />
            </>
          }
        ></Route>
        <Route
          path="/create_employee"
          element={
            <>
             <Header />
              <Create_employee />
            </>
          }
        ></Route>
        <Route
          path="/edit_employee/:employeeId"
          element={
            <>
            <Header />
              <Edit_employee />
            </>
          }
        ></Route>
        <Route
          path="/employee_list"
          element={
            <>
             <Header />
              <Employee_list />
            </>
          }
        ></Route>
         <Route
          path="/sign-in"
          element={
            <>
             
              <SignIn />
            </>
          }
        ></Route>
        <Route
          path="/sign-up"
          element={
            <>
             
              <SignUp />
            </>
          }
        ></Route>
        {/* <Route path="/*" element={<Navigate to="admin_dashboard" />} /> */}
      </Routes>
    </>
  );
}

export default AppRoutes;
