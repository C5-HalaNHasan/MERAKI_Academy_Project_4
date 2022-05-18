import "./onlinePayment.css";
import React,{useState,useContext} from "react";
import {Link,Routes,Route,useNavigate,useParams} from "react-router-dom";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; //! to make an automatic login
import NavBar from "../NavBar/NavBar";

import axios from "axios";

//! since the swapping-buy operation is going to be handelled here: the params will be taken from the checkout page as child propping!
//!(or could easily be deleted from the database!)
const OnlinePayment=()=>{
    const {token,setToken}=useContext(TokenContext); 
    const {currentUserId,setCurrentUserId}=useContext(TokenContext); 

    //to save the swapped item data so that it can be transferred to the check out page
    const {id,price,country,category,ownerId,img}=useParams();//! this is my item info
    const {swappedItem,setSwappedItem}=useContext(TokenContext);//this is the swapped item info

    //to show messages by modal box: //!MODALBOX WILL BE USED AS CONTEXT FROM APP: SHOW,TYPE,MESSAGE
    const [modalBoxMessage,setModalBoxlMessage]=useState(false)
    const [modalBoxMessageType,setModalBoxlMessageType]=useState("notOk")


    const navigate=useNavigate() //! used to redirect the user to the home page if payment is completed / and redirect the user to the checkout page if he clicked cancel


//! same function as used in the checkout page:
const Buy=async ()=>{ 
    let yourItemUrl=`http://localhost:5000/items/${swappedItem.id}`
    let myItemUrl=`http://localhost:5000/items/${id}`
    //update the swapped item from its original owner to the current user:
    await axios.put(myItemUrl,{owner:swappedItem.ownerId,isSold:"true"},{headers:{authorization:token}}).then(async (result1)=>{
    //update my item owner to the user is wapped his item:

    await axios.put(yourItemUrl,{owner:ownerId,isSold:"true"},{headers:{authorization:token}}).then(async (result2)=>{
        
    }).catch((error2)=>{
        console.log(error2);
    })

    }).catch((error1)=>{
        console.log(error1)
    })
};//! end of swapped owner function


//!PaymentAction is the same as swap!
const PaymentAction=()=>{ 
        console.log("from the payment page ",ownerId==swappedItem.ownerId)
        if(!ownerId==swappedItem.ownerId){ //! this condition to be checked
            // swapOwnersById();
            //! modal box will be shown when pressing ok then it will be redirected to the userItems page
         
        }else{ //! if not swap the user will be redirected to the online payment page (to be set)
            navigate("/")
        }
};


    return ( 
        // a form will be created for the online payment//might have the same style as the previous forms
        <>
        <NavBar/>
    <div className="mainBox">
    <h1>hello from the payment page</h1>
    </div>
    </>
    )

};

    
export default OnlinePayment;