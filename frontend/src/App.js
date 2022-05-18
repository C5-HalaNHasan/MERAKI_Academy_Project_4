
// import './App.css';
import React,{createContext,useState} from "react";
import {Routes,Route, Router,useParams} from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Register from "./components/Register/register";
import Login from "./components/Login/Login";
import SearchBox from "./components/SearchBox/SearchBox";
import WishList from "./components/WishList/WishList";
import Cart from "./components/Cart.js/Cart";
import UserBoard from "./components/UserBoard/UserItems";
import UserProfile from "./components/UserBoard/UserProfile";
import UserItems from "./components/UserBoard/UserItems";
import CheckOut from "./components/CheckOut.js/CheckOut";
import Swap from "./components/Swap/Swap";
import axios from "axios";


//token will be provided from the APP.js to each component where required
export const TokenContext=createContext(); 

const App=()=> {
  // if the token & the userId exists from previous session it will be restored here as an initial value;if not: its value will be null
  const [token,setToken]=useState(localStorage.getItem("token")); 
  const [currentUserId,setCurrentUserId]=useState(localStorage.getItem("currentUserId"));
  const [isRendered,setIsRendered]=useState(false); //! to detect any change and rerender
  const [allItemsInDb,setAllItemsInDb]=useState([]); //! for the live search //!not used yet
  const [currentUserItems,setCurrentUserItems]=useState([]); //! for the live search //!not used yet
  const [swappedItem,setSwappedItem]=useState({
    _id:"",
    price:"",
    img:"",
    category:"",
    country:"",
    ownerId:"",
  });






  return (
    <div className="App">
      <TokenContext.Provider value={{token,setToken,currentUserId,setCurrentUserId,isRendered,setIsRendered,allItemsInDb,setAllItemsInDb,currentUserItems,setCurrentUserItems,swappedItem,setSwappedItem}}>
      <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/search" element={<SearchBox/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/wishlist" element={<WishList/>}/>
      <Route path="/userboard" element={<UserBoard/>}/>
      <Route path="/userprofile" element={<UserProfile/>}/>
      <Route path="/useritems" element={<UserItems/>}/>
      <Route path="/swap/:id/:price/:country/:category/:ownerId/:img" element={<Swap/>}/>
      <Route path="/checkout/:id/:price/:country/:category/:ownerId/:img" element={<CheckOut/>}/>



      

      </Routes>
      </TokenContext.Provider>
    </div>
  );
}

export default App;
