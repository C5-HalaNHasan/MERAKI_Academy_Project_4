import "./userBoard.css"
import React,{useState,useContext} from "react";
import { useNavigate} from "react-router-dom";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; 

const UserBoard=()=>{
    const {token,setToken}=useContext(TokenContext);
    const {currentUserId,setCurrentUserId}=useContext(TokenContext); 
    const navigate = useNavigate();
    
    return <div className="HomePage">
    <h1>this is the main page</h1>
    </div>
};

export default UserBoard;