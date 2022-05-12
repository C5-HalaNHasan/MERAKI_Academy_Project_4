import "./navBar.css"
import React,{useState,useContext} from "react";
import { Route, useNavigate,Link } from "react-router-dom";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; 

const NavBar=()=>{
    //some navbar components/elements are going to be shown only for registered users //!not used yet
    const {token,setToken}=useContext(TokenContext); 
    const {currentUserId,setCurrentUserId}=useContext(TokenContext); 

    const navigate = useNavigate();
    //logout function that is going to delete the token & userId and remove some components/elements from the homePage & the NavBar
    const LogOut=()=>{
        //clear the local storage
        localStorage.clear();
    }

    return <div className="NavBar"> 
    {/* routes will be navigated once the icons clicked */}
    <h1>Logo</h1>
    {/* onchange the /search is going to be rendered */}
    <Link to="/search">Search </Link>
    <Link to="/wishlist">wishList </Link>
    <Link to="/cart">Cart</Link>
    <Link to="/userboard">UserBoard</Link>
    {/* use state here to update the logiut to login / the onClick action is going to set the state to login with link to login*/}
    <Link to="/"><label onClick={LogOut}>Logout</label></Link>
    </div>
};

export default  NavBar;