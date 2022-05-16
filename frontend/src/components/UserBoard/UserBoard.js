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

const UserBoard=({isDropDown,setIsDropDown})=>{
    const {token,setToken}=useContext(TokenContext);//!not used yet
    const {currentUserId,setCurrentUserId}=useContext(TokenContext); //!not used yet
    const {isRendered,setIsRendered}=useContext(TokenContext); //!not used yet
    const [items,setItems]=useState([]);//!not used yet
    let [resultMessage,setResultMessage]=useState("");//!not used yet
    const navigate = useNavigate();//!not used yet

    //logout function that is going to delete the token & userId and remove some components/elements from the homePage & the NavBar
    const LogOut=()=>{
        setToken(null);
        setCurrentUserId(null);
        //clear the local storage
        localStorage.clear();
        setIsRendered(true)
        navigate("/")
    }

    return <div>
    <h3>from the dashboard</h3>
    {/* links are not showing in the /userboard */}
    <Link to="/userprofile"><FaRegUserCircle/>Profile</Link>
    <Link to="/useritems"><AiOutlineProfile/>Items</Link>
    <Link to="/" onClick={()=>setIsDropDown(!setIsDropDown)}><FiLogIn/><label onClick={LogOut}>Logout</label></Link>

  
</div>
};

export default UserBoard;



     
    
    





     

    