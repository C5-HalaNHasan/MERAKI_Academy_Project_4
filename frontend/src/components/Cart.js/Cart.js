import "./cart.css"
import React,{useState,useContext,useEffect} from "react";
import { useNavigate} from "react-router-dom";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; 
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import Cards from "../Cards/Cards";

const Cart=()=>{
    //some home page components are going to be shown only for registered users //!not used yet
    const {token,setToken}=useContext(TokenContext);
    const {currentUserId,setCurrentUserId}=useContext(TokenContext); 
    const {isRendered,setIsRendered}=useContext(TokenContext); 
    const [items,setItems]=useState([]);
    const navigate = useNavigate();

    let cartItemstUrl="http://localhost:5000/cart"; //! to be deleted and search for user by id
    

    useEffect(()=>{ //! the items are rendered twice/ the render is going to be invoked on change
        axios.get(cartItemstUrl,{headers:{authorization:token}}).then((result)=>{
            console.log(result)
            setItems(result.data.cartItems)
            setIsRendered(true)
            console.log("from the cart items page",result.data.user) //! to be deleted
        }).catch((error)=>{
            console.log(error)
        })
        
    },[isRendered])
    
    return <div className="HomePage">
    <NavBar/>
    <h1>this is the cart</h1>
    <Cards items={items} type="cart"/>
    </div>
};

export default Cart;