import "./userBoard.css"
import React,{useState,useContext,useEffect} from "react";
import {BiLogOut} from "react-icons/bi";
import {FaRegUserCircle,FaBars} from "react-icons/fa";
import {AiOutlineProfile} from "react-icons/ai";
import { useNavigate,Link} from "react-router-dom";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; 

const UserBoard=({isClicked,setIsClicked,isDropDown,setIsDropDown})=>{
    const {token,setToken}=useContext(TokenContext);
    const {currentUserId,setCurrentUserId}=useContext(TokenContext); 
    const {isRendered,setIsRendered}=useContext(TokenContext); 
    const navigate = useNavigate();
    const {currentUserCountry,setCurrentUserCountry}=useContext(TokenContext);


    //logout function that is going to delete the token & userId and remove some components/elements from the homePage & the NavBar
    const LogOut=()=>{ 
        setIsClicked(!isClicked)
        setToken(null);
        setCurrentUserId(null);
        setCurrentUserCountry(null)
        localStorage.clear();
        setIsRendered(true)
        navigate("/")
    }

    return <div className="userBoard">
    <ul className={isDropDown? "dropDown clicked": "dropDownMenu"}>

    <li className="drpDownItem">
    <Link to="/userprofile" onClick={()=>setIsClicked(!isClicked)}><FaRegUserCircle/>Profile</Link>
    </li>

    <li className="drpDownItem">
    <Link to="/useritems" onClick={()=>setIsClicked(!isClicked)}><AiOutlineProfile/>Items</Link>
    </li>

    <li className="drpDownItem">
    <Link to="/" onClick={()=>LogOut()}><BiLogOut/>LogOut</Link>
    </li>

    </ul>

</div>
};

export default UserBoard;



     
    
    





     

    