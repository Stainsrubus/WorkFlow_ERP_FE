import React from "react";
import logo from "../../assets/company_logo.png";
import { useNavigate } from "react-router-dom";
import useLogout from '../../hooks/useLogout'
function Header() {
  const navigate = useNavigate();

  const navigation = [
    { name: "Home", href: "/admin_dashboard" },
    { name: "Employee List", href: "/employee_list"},
  ];
  let logout = useLogout()

  return (
    <div className="relative z-20">
  <div className="flex flex-row justify-between h-12 bg-white drop-shadow-lg items-center fixed top-0 right-0 left-0 ">
      <div className="logo-container flex items-center flex-row pl-5 gap-5">
        <img src={logo} alt="logo" className="w-[40px] h-[22px]" />
        <h1 className=" font-black text-2xl font-pacifico">Workflow</h1>
      </div>
      <div className="nav-container flex flex-row items-center gap-8  ">
      {navigation.map((item) => (
        <p  
          key={item.name}
          to={item.href}
          onClick={() => navigate(item.href)}
        >{item.name}</p>
        
        ))}
        <i className="fa-solid fa-right-to-bracket pr-10" onClick={logout}></i>
        </div>
    
    </div>
    </div>
  
  );
}

export default Header;
