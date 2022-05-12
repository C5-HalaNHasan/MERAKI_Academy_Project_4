
// import './App.css';
import React,{createContext,useState} from "react";
import {Routes,Route, Router} from "react-router-dom";
import HomePage from "./components/homePage/HomePage";
import Register from "./components/Register/register";
import Login from "./components/Login/Login";


//token will be provided from the APP.js to each component where required
export const TokenContext=createContext(); 

const App=()=> {
  const [token,setToken]=useState(JSON.parse(localStorage.getItem("token"))); // if the token exists from previous session it will be restored here as an initial value;if not: its value will be null

  return (
    <div className="App">
      <h1>ItemsEXchange</h1>
      <TokenContext.Provider value={{token,setToken}}>
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
