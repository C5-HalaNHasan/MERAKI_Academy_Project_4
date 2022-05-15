import "./navBar.css"
import {FiLogIn} from "react-icons/fi";
import {FaRegUserCircle} from "react-icons/fa";
import {AiOutlineShoppingCart,AiOutlineHeart} from "react-icons/ai";
import React,{useState,useContext} from "react";
import { Route, useNavigate,Link } from "react-router-dom";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; 
import SearchBox from "../SearchBox/SearchBox";

const NavBar=()=>{
    //some navbar components/elements are going to be shown only for registered users //!not used yet
    const {token,setToken}=useContext(TokenContext); 
    const {currentUserId,setCurrentUserId}=useContext(TokenContext); 
    const [isRendered,setIsRendered]=useState(TokenContext)
    const [searchedItem,setSearchedItem]=useState();


    const navigate = useNavigate();
    //logout function that is going to delete the token & userId and remove some components/elements from the homePage & the NavBar
    const LogOut=()=>{
        setToken(null);
        setCurrentUserId(null);
        //clear the local storage
        localStorage.clear();
        setIsRendered(true)
        navigate("/")
    }

    return <div className="NavBar"> 
    {/* routes will be navigated once the icons clicked */}
    <h1>Logo</h1>
    {/* onchange the /search is going to be rendered */}
    {/* <Link to="/search">Search </Link> */}
    <input onChange={(e)=>setSearchedItem(e.target.value)} placeholder="Search..."></input>
    {searchedItem&&<SearchBox searchedItem={searchedItem}/>} 
    <Link to="/wishlist"><AiOutlineHeart/>wishList </Link>
    <Link to="/cart"><AiOutlineShoppingCart/>Cart</Link>
    <Link to="/userboard"><FaRegUserCircle/>UserBoard</Link>
    {/* use state here to update the logiut to login / the onClick action is going to set the state to login with link to login*/}
    <Link to="/"><FiLogIn/><label onClick={LogOut}>Logout</label></Link>
    </div>
};

export default  NavBar;