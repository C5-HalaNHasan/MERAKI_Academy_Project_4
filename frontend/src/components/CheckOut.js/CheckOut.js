import "./checkOut.css";
import React,{useState,useContext} from "react";
import {Link,Routes,Route,useNavigate,useParams} from "react-router-dom";
import axios from "axios";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; //! to make an automatic login
import abs_wall from "../assets/abs_wall.jpg";
import NavBar from "../NavBar/NavBar";


const CheckOut=()=>{
    const {token,setToken}=useContext(TokenContext); 
    //to save the current userId
    const {currentUserId,setCurrentUserId}=useContext(TokenContext); 

    //to save the swapped item data so that it can be transferred to the check out page
    const {id,price,country,category,ownerId,img}=useParams();//! this is my item info
    const {swappedItem,setSwappedItem}=useContext(TokenContext);//this is the swapped item info


    const navigate=useNavigate() //! used to redirect the user to the onlinePaymentPage if he clicked proceed
    //!and THIS DEPENDS IF THE OPERATION IS SWAP OR BY//and return to the previous page if he clicked cancel

    //to show messages by modal box: //!MODALBOX WILL BE USED AS CONTEXT FROM APP: SHOW,TYPE,MESSAGE
    const [modalBoxMessage,setModalBoxlMessage]=useState(false)
    const [modalBoxMessageType,setModalBoxlMessageType]=useState("notOk")


    //! THIS FUNCTION either SWAP OR REDIRECT TO THE ONLINE PAYMENT PAGE: THIS DEPENDS on:
    //if  ownerId==swappedItem.ownerId then its buy==> proceed to the online payment else proceed to swap
    //if swapped: //! amodalBox will appear telling the user that it's a successful operation //then when pressing ok it will redirect the user to the main page
//!SWAPPING IS NOT GOING TO BE HANDELED IN THIS PAGE:IT WILL BE HANDELED IN THE CHECKOUT PAGE /
//:the owners of the items and setting the isSold:tru
const swapOwnersById=async ()=>{ 
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


//!buyAction is the same as swap! but it will be handelled in the online payment page
const BuyAction=async ()=>{ 
  
};















     

    const CheckOutAction=()=>{ 
        console.log("from the checkout page ",ownerId==swappedItem.ownerId)
        if(!ownerId==swappedItem.ownerId){
            swapOwnersById();
            //! modal box will be shown when pressing ok then it will be redirected to the userItems page
         
        }else{ //! if not swap the user will be redirected to the online payment page (to be set)
            navigate("/")

        }
};


    return ( 
        <>
        <NavBar/>
    <div className="mainBox">
    
    <div className="registrationBox">
     <div className="firstPart">
     {/* //! the swappd item will be shown b y setting a ternary operator if swapped item id saved in context===the id sent to the checkout page */}
    <img src={abs_wall} /> 
    <img src={abs_wall} /> //! the swappd item will be shown

    </div>

    <div className="secondPart">
    <h3>CheckOut Page</h3>
    <h3>Please fill the following fields:</h3>
    <form id="form" className="left leftCol" onSubmit={(e)=>{e.preventDefault()}}>
        <input type="text" placeholder="First Name..." name="firstName" ></input>
        <input type="text" placeholder="Last Name..." name="lastName" ></input>
        <input type="text" placeholder="Contact Number..." name="contactNum" ></input>
        <input type="text" placeholder="City..." name="city" ></input>
        <input type="text" placeholder="Address..." name="address" ></input>
        <button onClick={CheckOutAction} className="btn">Proceed</button>
        <button onClick={()=>{navigate(-1)}} className="btn">Cancel</button>
        </form>
        {/* //! to be updated (a modalBox with settime out is going to be shown) */}
    </div>
    </div>
    </div>
    </>
    )

};

    
export default CheckOut;