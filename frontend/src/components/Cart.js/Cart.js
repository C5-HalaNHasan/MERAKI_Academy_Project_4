import React,{useState,useContext,useEffect} from "react";
import { useNavigate} from "react-router-dom";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; 
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import Cards from "../Cards/Cards";

const Cart=()=>{
    const {token,setToken}=useContext(TokenContext);
    const {currentUserId,setCurrentUserId}=useContext(TokenContext); 
    const {isRendered,setIsRendered}=useContext(TokenContext); 
    const [items,setItems]=useState([]);

    let userCartUrl="http://localhost:5000/users/user";
    useEffect(()=>{ 
        axios.get(userCartUrl,{headers:{authorization:token}}).then((result)=>{
            setItems(result.data.user.cartItems)
            setIsRendered(true)
        }).catch((error)=>{
            console.log(error)
        })
    },[isRendered])
    
    return <div className="HomePage">
    <NavBar/>
    <Cards items={items} type="cart"/>
    </div>
};

export default Cart;