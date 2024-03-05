import { useEffect,useState } from "react";
import { BrowserRouter ,Routes,Route} from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes";
import AxiosService from "./components/utils/ApiService";
import  useTheme  from "./hooks/useTheme";

function App() {
  
  

 

    return (
        <div className="">
        <BrowserRouter>
         <AppRoutes />
        </BrowserRouter>
        </div>
    );
}

export default App;
