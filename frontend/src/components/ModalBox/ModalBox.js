import "./modalBox.css"
import {AiOutlineCloseCircle} from "react-icons/ai";
import React,{useState,useContext,useEffect} from "react";
import axios from "axios";
import { useNavigate,Link} from "react-router-dom";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; 
import abs_wall from "../assets/abs_wall.jpg"
import { FaRegFileArchive } from "react-icons/fa";


const ModalBox=({showModalBox,setShowModalBox})=>{
    // the below three states to be used in every component for authorization and re-rendering:
    const {token,setToken}=useContext(TokenContext);
    const {currentUserId,setCurrentUserId}=useContext(TokenContext); 
    const {isRendered,setIsRendered}=useContext(TokenContext); 

    if(showModalBox==false){
        return null;
    }



return <div className="modalBox">
<div className="contentsContainer">
<img src={abs_wall}/>

<div className="modalRight">
<span class="closeModalBox"><AiOutlineCloseCircle onClick={()=>{
    setShowModalBox(false)
}}/></span>

<div className="boxContent">
<h3>message</h3>
<p>a message is going to be rendered for the user based on the clicked button: if buy it will show a box to specify address then to the onlinement page, if swap: it will render the elements of the user that are >= price of the element, if add to wishList: it will tell the user that the item has been added/removed to/from the wish list,if add to cart: it will show the user that the item has been added/removed from cart</p>
</div>

<div className="actionButtonsContainer">
{/* the buttons are going to be rendered based on the clicked button on the card */}
<button className="actionButton">Ok</button>
<button className="actionButton">Cancel</button>
</div>

</div>

</div>
    
</div>
};

export default ModalBox;