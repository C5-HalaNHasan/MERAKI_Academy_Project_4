import "./onlinePayment.css";
import React,{useState,useContext} from "react";
import {Link,Routes,Route,useNavigate,useParams} from "react-router-dom";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; //! to make an automatic login
import NavBar from "../NavBar/NavBar";

import axios from "axios";

//! since the swapping-buy operation is going to be handelled here: the params will be taken from the checkout page as child propping!
//!(or could easily be deleted from the database!)
const OnlinePayment=()=>{
    const {token,setToken}=useContext(TokenContext); 
    const {currentUserId,setCurrentUserId}=useContext(TokenContext); 

    //to save the swapped item data so that it can be transferred to the check out page
    const {item,id,price,country,category,ownerId,img}=useParams();//! this is my item info
    const {swappedItem,setSwappedItem}=useContext(TokenContext);//this is the swapped item info

    //to show messages by modal box: //!MODALBOX WILL BE USED AS CONTEXT FROM APP: SHOW,TYPE,MESSAGE
    const [modalBoxMessage,setModalBoxlMessage]=useState(false)
    const [modalBoxMessageType,setModalBoxlMessageType]=useState("notOk")


    const navigate=useNavigate() //! used to redirect the user to the home page if payment is completed / and redirect the user to the checkout page if he clicked cancel


//! same function as used in the checkout page:
const Buy=async ()=>{ 
    
};//! end of swapped owner function


//!PaymentAction is the same as swap!
const PaymentAction=()=>{ 
 
};


    return ( 
        // a form will be created for the online payment//might have the same style as the previous forms
        <>
        <NavBar/>
    <div className="mainBox">
    <h1>hello from the payment page/STILL NOT WORKING YET</h1>
    </div>
    </>
    )

};

    
export default OnlinePayment;