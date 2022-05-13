import "./wishList.css"
import React,{useState,useContext,useEffect} from "react";
import { useNavigate} from "react-router-dom";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; 
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import Cards from "../Cards/Cards";

const WishList=()=>{
    //some home page components are going to be shown only for registered users //!not used yet
    const {token,setToken}=useContext(TokenContext);
    const {currentUserId,setCurrentUserId}=useContext(TokenContext); 
    const [items,setItems]=useState([]);

    const [isRendered,setIsRendered]=useState(false)
    const navigate = useNavigate();

    let wishListUrl="http://localhost:5000/users/user";

    useEffect(()=>{ //! the items are rendered twice/ the render is going to be invoked on change
        axios.get(wishListUrl,{headers:{authorization:token}}).then((result)=>{
            setItems(result.data.user.wishList)
            setIsRendered(true)
            console.log(result.data.user.wishList) //! it only gives one item from the wishList not all of them
        }).catch((error)=>{
            console.log(error)
        })
        
    },[isRendered])
    
    return <div className="HomePage">
    <NavBar/>
    <Cards items={items}/>
    <h1>this is the wishList page</h1>
    </div>
};

export default WishList;