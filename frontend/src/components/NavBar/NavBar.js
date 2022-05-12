import "./navBar.css"
import React,{useState,useContext} from "react";
import { useNavigate } from "react-router-dom";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; 
import SearchBox from "../SearchBox/SearchBox";
import WishList from "../WishList/WishList";
import Cart from "../Cart.js/Cart";
import UserBoard from "../UserBoard/UserBoard";

const NavBar=()=>{
    //some navbar components/elements are going to be shown only for registered users //!not used yet
    const {token,setToken}=useContext(TokenContext); 
    const {currentUserId,setCurrentUserId}=useContext(TokenContext); 

    const navigate = useNavigate();
    //logout function that is going to delete the token & userId and remove some components/elements from the homePage & the NavBar
    const LogOut=()=>{
        //clear the local storage
        localStorage.clear();
        //to redirect the user to the homePage again
        navigate("/")
    }
    
    return <div className="NavBar"> 
    {/* routes will be navigated once the icons clickked */}
    <h1>Logo</h1>
    <SearchBox />
    <WishList />
    <Cart />
    <UserBoard />
    {LogOut}
    </div>
};

export default  NavBar;