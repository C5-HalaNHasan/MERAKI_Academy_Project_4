import "./userBoard.css"
import React,{useState,useContext,useEffect} from "react";
import { useNavigate} from "react-router-dom";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; 
import axios from "axios";
import Cards from "../Cards/Cards";
import NavBar from "../NavBar/NavBar";

// toDo: if the user has items with price >= item he would like to exchange  && they both live in the same country: the cards are going to be rendered with one button only which is swap

// toDo: when swap is pressed: //! this will be handelled in the cards component
// toDo-1:the owner of the two items will be exchanged
// toDo-2:the state of the item will be set to isSold:true so that it will not be rerenderd in the main page
// toDo-3:the user will be redirected to the deliveryPage where he enters his address so that the item will be delivered to him
// toDo-4: when the other user logs in: he will be notified with this action (also if the item has swapConfirmed set to true:extra)



const Swap=()=>{
    const {token,setToken}=useContext(TokenContext);
    const {currentUserId,setCurrentUserId}=useContext(TokenContext); 
    const {isRendered,setIsRendered}=useContext(TokenContext); 
    const [items,setItems]=useState([]);
    let [resultMessage,setResultMessage]=useState("");


    //get user by id to show his picture in the update box:
    let getAllItemsUrl="http://localhost:5000/items"; //!to be updated
    useEffect(()=>{ //! the items are rendered twice/ the render is going to be invoked on change
        axios.get(getAllItemsUrl,{headers:{authorization:token}}).then((result)=>{
            console.log("from userItems",result.data.items)
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
<Cards items={items} type="swap"/>
</div>
};

export default Swap;



     
    
    





     

    