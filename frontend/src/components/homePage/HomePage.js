import "./homepage.css"
import React,{useState,useContext} from "react";
import { useNavigate} from "react-router-dom";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; 
import NavBar from "../NavBar/NavBar";

const HomePage=()=>{
    //some home page components are going to be shown only for registered users //!not used yet
    const {token,setToken}=useContext(TokenContext);
    const {currentUserId,setCurrentUserId}=useContext(TokenContext); 
    const navigate = useNavigate();

    return <div className="HomePage">
    <NavBar/> //! to be rendered differntly if the user is not logged in
    <h1>this is the main page</h1>
    </div>
};

export default HomePage;