import "./cards.css"
import React,{useState,useContext} from "react";
import { useNavigate} from "react-router-dom";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; 

const Cards=({items})=>{
    const {token,setToken}=useContext(TokenContext);
    const {currentUserId,setCurrentUserId}=useContext(TokenContext); 
    const navigate = useNavigate();
    console.log(items)

    return <div className="cardsContainer">
    <h1>here the cards are going to be rendered</h1>
    {items.map((elem)=>{
        return <div className="card">
            <h3>{elem.item}</h3>
            <h3>{elem.description}</h3>
            <h3>{elem.owner}</h3>
            {elem.swap&&<button>swap</button>}
            {elem.sell&&<button>buy</button>}
        </div>
    })
    }
    </div>
};

export default Cards;