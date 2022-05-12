
// import './App.css';
import React,{createContext,useState} from "react";
import {Routes,Route, Router} from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Register from "./components/Register/register";
import Login from "./components/Login/Login";
import SearchBox from "./components/SearchBox/SearchBox";
import WishList from "./components/WishList/WishList";
import Cart from "./components/Cart.js/Cart";
import UserBoard from "./components/UserBoard/UserBoard";


//token will be provided from the APP.js to each component where required
export const TokenContext=createContext(); 

const App=()=> {
  // if the token & the userId exists from previous session it will be restored here as an initial value;if not: its value will be null
  const [token,setToken]=useState(localStorage.getItem("token")); 
  const [currentUserId,setCurrentUserId]=useState(localStorage.getItem("currentUserId"));

  return (
    <div className="App">
      <TokenContext.Provider value={{token,setToken,currentUserId,setCurrentUserId}}>
      <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/search" element={<SearchBox/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/wishlist" element={<WishList/>}/>
      <Route path="/userboard" element={<UserBoard/>}/>
      </Routes>
      </TokenContext.Provider>
    </div>
  );
}

export default App;
