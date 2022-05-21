import "./navBar.css"
import {FiLogIn,FiSearch} from "react-icons/fi";
import {FaRegUserCircle,FaBars,FaRegTimesCircle} from "react-icons/fa";
import {AiOutlineShoppingCart,AiOutlineHeart} from "react-icons/ai";
import {IoIosArrowDropdownCircle,IoMdSwap} from "react-icons/io";
import React,{useState,useContext,useEffect} from "react";
import axios from "axios";
import { Route, useNavigate,Link } from "react-router-dom";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; 
import UserBoard from "../UserBoard/UserBoard";
import Cards from "../Cards/Cards";

const NavBar=()=>{
    //some navbar components/elements are going to be shown only for registered users //!not used yet
    const {token,setToken}=useContext(TokenContext); 
    const {currentUserId,setCurrentUserId}=useContext(TokenContext); 
    const [isRendered,setIsRendered]=useState(TokenContext)
    const [searchedItem,setSearchedItem]=useState();
    const {spanUserData,setSpanUserData}=useContext(TokenContext); 
    const [items,setItems]=useState([]);


    //to control the hamburger menu:
    const [isClicked,setIsClicked]=useState(false);
    //to control the dropdown of the userBoard menu: where the update profile,user items && logout actions
    const [isDropDown,setIsDropDown]=useState(false);

    const navigate = useNavigate();
    //to redirect the user to the registration page if not logged in //! not set yet
    const toRegisterPage=()=>{
        navigate("/register")
    }


    //searchBox function:
    const searchBox=(searchedItem)=>{
        setSearchedItem(searchedItem);
        let searchUrl="http://localhost:5000/items"
        axios.get(searchUrl,{headers:{authorization:token}}).then((result)=>{
            if(result&&result.data.items.length>0&&searchedItem){
               let filteredItems= result.data.items.filter((elem)=>{
                    if(elem.item.toLowerCase().includes(searchedItem.toLowerCase())){
                        return elem;
                    }
                })
                setItems(filteredItems);
                // setIsRendered(!isRendered); 
            }else{
                setItems(result.data.items);
            }
        }).catch((error)=>{
            console.log(error)
        })
    };
    

    useEffect(()=>{
        searchBox(searchedItem);
    },[searchedItem])

    console.log(spanUserData)


    return <header>
    <div className="NavBar"> 
    {/* routes will be navigated once the icons clicked */}
    <div  className="navBarLogo">
    <h1><Link to="/">SWAPaPP<span>let's do a swap,{spanUserData.firstName}!</span></Link> </h1>
    </div>
    
    <div onClick={()=>setIsClicked(!isClicked)}>
    {/* <FaBars className="burgerMenuIcon"/> */}
    {!isClicked?<FaBars className="burgerMenuIcon"/>:<FaRegTimesCircle  className="burgerMenuIcon"/>}
    </div>


    <ul className={isClicked? "navBurger": ""}>

    {/* setting onClick when the user presses enter e.key /also the search bar will only appear in the MAIN PAGE*/}
    <li className="navBarItem searchBox">
    {token&&<input onChange={(e)=>searchBox(e.target.value)} placeholder="🔍Search..."></input>}
    </li>
    {searchedItem&&<Cards items={items} setItems={setItems} type="search"/>}

    <li className="navBarItem">
    {token&&<Link to="/wishlist" onClick={()=>setIsClicked(!isClicked)}>wishList<AiOutlineHeart style={{position:"absolute",top:"5px"}}/><span>{spanUserData.wishList}</span></Link>}
    </li>

    <li className="navBarItem">
    {token&&<Link to="/cart" onClick={()=>setIsClicked(!isClicked)}>Cart<AiOutlineShoppingCart style={{position:"absolute",top:"5px"}}/><span>{spanUserData.cartItems}</span></Link>}
    </li>

    {/* th userBoard will only appear when the user is logged in else/a register will appear instead! */}

    <li className="navBarItem">
    {token&&<Link to="" onClick={()=>setIsDropDown(!isDropDown)}>UserBoard<IoIosArrowDropdownCircle style={{position:"absolute",top:"5px"}} /></Link>}
    {token&&isDropDown&&<UserBoard isDropDown={isDropDown} setIsDropDown={setIsDropDown} isClicked={isClicked} setIsClicked={setIsClicked}/>}
    {!token&&<Link to="/login" onClick={()=>setIsClicked(!isClicked)}>Login<FiLogIn style={{position:"absolute",top:"5px"}}/></Link>}
    </li>

    {/* register: not working */}
    {/* {!token?<li className="navBarItem">
    <Link to="/register" onClick={()=>setIsClicked(!isClicked)}><FiLogIn/></Link>
    </li> */}

    </ul>

    </div>
    </header>
};

export default  NavBar;