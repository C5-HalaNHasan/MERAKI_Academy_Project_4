import "./navBar.css"
import {FiLogIn,FiSearch} from "react-icons/fi";
import {FaRegUserCircle,FaBars} from "react-icons/fa";
import {AiOutlineShoppingCart,AiOutlineHeart,AiFillCloseCircle,} from "react-icons/ai";
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

    //to control the hamburger menu:
    const [isClicked,setIsClicked]=useState(false);

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
    <Link to="/" className="navBarLogo">Logo</Link>
    {/* onchange the /search is going to be rendered */}
    {/* <Link to="/search">Search </Link> */}
    <div className="menuIcon" onClick={()=>setIsClicked(!isClicked)}>
    {isClicked?<FaBars/>:<AiFillCloseCircle/>}
    </div>

    <ul className={isClicked? "navActive": "navMenu"}>

    <li className="navBarItem">
    <Link to="/" onClick={()=>setIsClicked(!isClicked)}>MainPage </Link>
    </li>

    <li className="navBarItem">
    <FiSearch/><input onChange={(e)=>setSearchedItem(e.target.value)} placeholder="Search..."></input>
    {searchedItem&&<SearchBox searchedItem={searchedItem}/>}
    </li>

    <li className="navBarItem">
    <Link to="/wishlist" onClick={()=>setIsClicked(!isClicked)}><AiOutlineHeart/>wishList </Link>
    </li>

    <li className="navBarItem">
    <Link to="/cart" onClick={()=>setIsClicked(!isClicked)}><AiOutlineShoppingCart/>Cart</Link>
    </li>

    <li className="navBarItem">
    <Link to="/userboard" onClick={()=>setIsClicked(!isClicked)}><FaRegUserCircle/>UserBoard</Link>
    </li>

    <li className="navBarItem">
    <Link to="/" onClick={()=>setIsClicked(!isClicked)}><FiLogIn/><label onClick={LogOut}>Logout</label></Link>
    </li>
    </ul>

    </div>
};

export default  NavBar;