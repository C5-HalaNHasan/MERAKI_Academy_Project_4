import "./homepage.css"
import React,{useState,useContext} from "react";
import { useNavigate} from "react-router-dom";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; 
import NavBar from "../NavBar/NavBar";
import FilterBox from "../FilterBy/FilterBy";
import Cards from "../Cards/Cards";


const HomePage=()=>{
    const {token,setToken}=useContext(TokenContext);
    const {currentUserId,setCurrentUserId}=useContext(TokenContext); 
    const {allItemsInDb,setAllItemsInDb}=useContext(TokenContext); 

    const navigate = useNavigate();

    return <div className="HomePage">
    {/* //! to be rendered differntly if the user is not logged in */}
    <NavBar/> 
    {token&&<FilterBox />}
    {token&&<Cards items={allItemsInDb}/>}
    </div>
};

export default HomePage;