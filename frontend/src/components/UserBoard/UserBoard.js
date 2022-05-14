import "./userBoard.css"
import React,{useState,useContext,useEffect} from "react";
import { useNavigate} from "react-router-dom";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; 
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import UserItems from "./UserItems";
import UserProfile from "./UserProfile";

const UserBoard=()=>{
    const {token,setToken}=useContext(TokenContext);//!not used yet
    const {currentUserId,setCurrentUserId}=useContext(TokenContext); //!not used yet
    const {isRendered,setIsRendered}=useContext(TokenContext); //!not used yet
    const [items,setItems]=useState([]);//!not used yet
    let [resultMessage,setResultMessage]=useState("");//!not used yet
    const navigate = useNavigate();//!not used yet

    return <div>
    <NavBar/>
    <h3>from the dashboard</h3>
    {/* links are not showing in the /userboard */}
    <Link to="/userprofile">UserProfile</Link>
    <Link to="/useritems">UserItems</Link>
</div>
};

export default UserBoard;



     
    
    





     

    