import "./swap.css"
import React,{useState,useContext,useEffect} from "react";
import { useNavigate,useParams} from "react-router-dom";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; 
import axios from "axios";
import Cards from "../Cards/Cards";
import NavBar from "../NavBar/NavBar";
import UserItems from "../UserBoard/UserItems";




//! this will be handelled in the cards component
// toDo: if the user has items with price >= item he would like to exchange  && they both live in the same country: the cards are going to be rendered with one button only which is swap
// toDo: when swap is pressed: 
// toDo-1:the owner of the two items will be exchanged
// toDo-2:the state of the item will be set to isSold:true so that it will not be rerenderd in the main page
// toDo-3:the user will be redirected to the deliveryPage where he enters his address so that the item will be delivered to him
// toDo-4: when the other user logs in: he will be notified with this action (also if the item has swapConfirmed set to true:extra)



const Swap=()=>{
    const {token,setToken}=useContext(TokenContext);
    const {currentUserId,setCurrentUserId}=useContext(TokenContext); 
    const {isRendered,setIsRendered}=useContext(TokenContext); 
    let [resultMessage,setResultMessage]=useState("");
    const [items,setItems]=useState([])
    const [canSwap,setCanSwap]=useState(false)
    const [itemPrice,setItemPrice]=useState(0)



    //to get the id of the item and search for it in the data base:
    const {id}=useParams()

//to search for the passed (wanted to be swaped by):
    useEffect=(()=>{
        console.log("from searching byid",id)

        let itemByIdURL=`http://localhost:5000/items/${id}`
        axios.get(itemByIdURL,{headers:{authorization:token}}).then((result)=>{
           if(result){
               console.log("from item price ",result)
               setItemPrice(result.item.price)
           }
        }).catch((error)=>{
            console.log(error)
        })

    },[isRendered])


    const {userItems,setUserItems}=useContext(TokenContext); 
    useEffect=(()=>{
        let allItemsURL=`http://localhost:5000/items`
        axios.get(allItemsURL,{headers:{authorization:token}}).then((result)=>{
           if(result.data.items.length>0){
            let filteredItems= result.data.items.filter((elem)=>{
                return elem.owner._id==currentUserId
            })
            setUserItems(filteredItems); 
            console.log("swap filterd items are ",filteredItems)
    
            let filteredItemsByPrice= userItems.filter((elem)=>{
                return elem.price>=itemPrice
            })
            setItems(filteredItemsByPrice); 
            console.log("swap filterd items are ",filteredItems)
            if(filteredItemsByPrice.length>0){
                setCanSwap(true);
            }
           }
        }).catch((error)=>{
            console.log(error)
        })

    },[isRendered])

console.log("hello from swap action",userItems)

   console.log("hello from Swap component, the acceptable elements are :" ,items)




return <div>
<NavBar/>
<Cards items={items} type="swap"/>
</div>
};

export default Swap;



     
    
    





     

    