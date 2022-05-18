import "./userBoard.css"
import React,{useState,useContext,useEffect} from "react";
import {FiLogIn,FiSearch} from "react-icons/fi";
import {FaRegUserCircle,FaBars} from "react-icons/fa";
import {AiOutlineProfile} from "react-icons/ai";

import { useNavigate,Link} from "react-router-dom";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; 
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import UserItems from "./UserItems";
import UserProfile from "./UserProfile";

const UserBoard=({isClicked,setIsClicked,isDropDown,setIsDropDown})=>{
    const {token,setToken}=useContext(TokenContext);//!not used yet
    const {currentUserId,setCurrentUserId}=useContext(TokenContext); //!not used yet
    const {isRendered,setIsRendered}=useContext(TokenContext); //!not used yet
    const [items,setItems]=useState([]);//!not used yet
    let [resultMessage,setResultMessage]=useState("");//!not used yet
    const navigate = useNavigate();//!not used yet

    //logout function that is going to delete the token & userId and remove some components/elements from the homePage & the NavBar
    const LogOut=()=>{
        // setIsClicked(!isClicked)
        // setToken(null);
        // setCurrentUserId(null);
        // localStorage.clear();
        // setIsRendered(true)
        // navigate("/")
        console.log("hello from log out")
    }

    return <div className="userBoard">
    <ul className={isDropDown? "dropDown clicked": "dropDownMenu"}>

    <li className="drpDownItem">
    <Link to="/userprofile" onClick={()=>setIsClicked(!isClicked)}><FaRegUserCircle/>Profile</Link>
    </li>
    {/* when clicking on the items it will redirect the user to his items but the dropdown menu stops responding */}

    <li className="drpDownItem">
    <Link to="/useritems" onClick={()=>setIsClicked(!isClicked)}><AiOutlineProfile/>Items</Link>
    </li>

    <li className="drpDownItem">
    <Link to="/" onClick={()=>LogOut}><FiLogIn/>Logout</Link>
    </li>

    </ul>

</div>
};

export default UserBoard;



     
    
    





     

    