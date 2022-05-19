import "./modalBox.css"
import {AiOutlineCloseCircle} from "react-icons/ai";
import React,{useState,useContext,useEffect} from "react";
import axios from "axios";
import { useNavigate,Link} from "react-router-dom";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; 
import ok from "../assets/ok.png"
import alert from "../assets/alert.png"
import notOk from "../assets/notOk.jpg"
import { FaRegFileArchive } from "react-icons/fa";
import abs_wall from "../assets/abs_wall.jpg"



//! 19/5: unused variables/functions/components to be deleted
const ModalBox=({showModalBox,setShowModalBox,message,type})=>{
    // the below three states to be used in every component for authorization and re-rendering:
    const {token,setToken}=useContext(TokenContext);
    const {currentUserId,setCurrentUserId}=useContext(TokenContext); 
    const {isRendered,setIsRendered}=useContext(TokenContext); 
    const {modalBox,setModalBox}=useContext(TokenContext); 


    if(modalBox.showModalBox===false){
        return null;
    }

console.log(modalBox)//! to be deleted
return <div className="modalBox">
<div className="contentsContainer">
{/* diferent pictures are going to be rendered based on the success of the operation */}
{modalBox.type==="ok" && <img src={ok} alt="ok"/>}
{modalBox.type==="notOk" && <img src={notOk} alt="notOk"/>}
{modalBox.type==="alert" && <img src={alert} alt="alert"/>}

<div className="modalRight">
<span class="closeModalBox"><AiOutlineCloseCircle onClick={()=>{
    setModalBox({type:"", message:"",details:"", showModalBox:false})
}}/></span>

<div className="boxContent">
<h1>{modalBox.message}</h1>
<h2>{modalBox.details}</h2>
</div>

<div className="actionButtonsContainer">
{/* the buttons are going to be rendered based on the clicked button on the card (as symbols)*/}
<button className="actionButton" onClick={()=>{
    setModalBox({type:"", message:"",details:"", showModalBox:false})
}}>Ok</button>
</div>

</div>

</div>
    
</div>
};

export default ModalBox;