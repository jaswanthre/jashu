import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import SignUp from "./components/signup";
import Loginemployee from "./components/loginemployee";
import {RequireToken} from './components/auth.js'

import Dashboard from "./components/dashboard";
import Home from "./components/home";
import Employee from "./components/employee";
import Profile from "./components/profile";
import AddEmployee from "./components/addemployee";
import EditEmployee from './components/editemployee';
import Dashboards from './components/Dashboards';

import ManageWorkProfile from './components/ManageWorkProfile';
import MyWork from './components/MyWork';
import Progress from './components/Progress';

function App() {
  return (
    <div className="app">
        <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/loginemployee" element={<Loginemployee />} />
             
   
              <Route path='/' element={
                  <RequireToken>
                    <Dashboard />
                  </RequireToken>
                  }>
                  <Route path='' element={<Home />}></Route>
                  <Route path='/employee' element={<Employee />}></Route>
                  <Route path='/profile' element={<Profile />}></Route>
                 
                  
                  <Route path='/create' element={<AddEmployee />}></Route>
                  <Route path='/employeeedit/:id' element={<EditEmployee />}></Route>
                  <Route path="/progress" element={<Progress />} />
              </Route>
              
         
            <Route path="/dashboards" element={<Dashboards />} />
            <Route path="/manage-work-profile" element={<ManageWorkProfile />} />
    
            <Route path="/my-work" element={<MyWork />} />
            
            
           
        
            </Routes>
           
        </BrowserRouter>
    </div>
  );
}
   
export default App;