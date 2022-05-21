import React,{useState,useContext,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; 
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import Cards from "../Cards/Cards";

const WishList=()=>{
    const {token,setToken}=useContext(TokenContext);
    const {isRendered,setIsRendered}=useContext(TokenContext); 
    const [items,setItems]=useState([]);
    
    let wishListUrl="http://localhost:5000/users/user";
    useEffect(()=>{
        axios.get(wishListUrl,{headers:{authorization:token}}).then((result)=>{
            setItems(result.data.user.wishList)
            setIsRendered(true)
        }).catch((error)=>{
            console.log(error)
        })
    },[isRendered])
    
    return <div>
    <NavBar/>
    <Cards items={items} type="wishList"/>
    </div>
};

export default WishList;