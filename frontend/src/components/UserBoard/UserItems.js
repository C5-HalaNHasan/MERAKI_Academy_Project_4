import "./userBoard.css"
import React,{useState,useContext,useEffect} from "react";
import { useNavigate} from "react-router-dom";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; 
import axios from "axios";
import Cards from "../Cards/Cards";
import NavBar from "../NavBar/NavBar";


const UserItems=()=>{
    const {token,setToken}=useContext(TokenContext);
    const {currentUserId,setCurrentUserId}=useContext(TokenContext); 
    const {isRendered,setIsRendered}=useContext(TokenContext); 
    const [items,setItems]=useState([]);
    let [resultMessage,setResultMessage]=useState("");


    //get user by id to show his picture in the update box:
    let getAllItemsUrl="http://localhost:5000/items"; //!to be updated
    useEffect(()=>{ //! the items are rendered twice/ the render is going to be invoked on change
        axios.get(getAllItemsUrl,{headers:{authorization:token}}).then((result)=>{
            console.log("hala is tired today",result.data.items)
           let filteredItemsByUser= result.data.items.filter((elem)=>{
               return elem.owner._id==currentUserId;
           })
        setItems( filteredItemsByUser);
        setIsRendered(true);
        }).catch((error)=>{
            console.log(error)
        })
    },[isRendered])

return <div>
<NavBar/>
<h3>userItems</h3>
<Cards items={items} type="userBoard"/>
</div>
};

export default UserItems;



     
    
    





     

    