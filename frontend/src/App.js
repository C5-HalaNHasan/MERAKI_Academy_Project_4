
// import './App.css';
import React,{createContext,useState} from "react";
import {Routes,Route, Router} from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Register from "./components/Register/register";
import Login from "./components/Login/Login";


//token will be provided from the APP.js to each component where required
export const TokenContext=createContext(); 

const App=()=> {
  // if the token & the userId exists from previous session it will be restored here as an initial value;if not: its value will be null
  const [token,setToken]=useState(localStorage.getItem("token")); 
  const [currentUserId,setCurrentUserId]=useState(localStorage.getItem("currentUserId"));

  return (
    <div className="App">
      <h1>ItemsEXchange</h1>
      <TokenContext.Provider value={{token,setToken,currentUserId,setCurrentUserId}}>
      <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      </Routes>
      </TokenContext.Provider>
    </div>
  );
}

export default App;
