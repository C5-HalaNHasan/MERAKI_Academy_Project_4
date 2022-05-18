import "./checkOut.css";
import React,{useState,useContext,useEffect} from "react";
import {Link,Routes,Route,useNavigate,useParams} from "react-router-dom";
import axios from "axios";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; //! to make an automatic login
import abs_wall from "../assets/abs_wall.jpg";
import NavBar from "../NavBar/NavBar";

//! 19/5: TO BE CHECKED,SWAPPING IS NOT WORKING ALL THE TIMES!
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
    const [modalBoxMessage,setModalBoxlMessage]=useState(false) //! to be handelled as context
    const [modalBoxMessageType,setModalBoxlMessageType]=useState("notOk") //! to be handelled as context

    //! THIS FUNCTION either SWAP OR REDIRECT TO THE ONLINE PAYMENT PAGE: THIS DEPENDS on:
    //! amodalBox will appear telling the user that it's a successful operation //then when pressing ok it will redirect the user to the main page
//:the owners of the items and setting the isSold:true
const swapOwnersById=async ()=>{ 
    let yourItemUrl=`http://localhost:5000/items/${swappedItem.id}`
    let myItemUrl=`http://localhost:5000/items/${id}`
        //update the swapped item from its original owner to the current user:
       await axios.put(myItemUrl,{owner:swappedItem.ownerId,isSold:"true"},{headers:{authorization:token}}).then(async (result1)=>{
            console.log("from checkout result1 ",result1)
        //update my item owner to the user is wapped his item:
       await axios.put(yourItemUrl,{owner:ownerId,isSold:"true"},{headers:{authorization:token}}).then(async (result2)=>{
            console.log("from checkout result2 ",result2)
        }).catch((error2)=>{
            console.log(error2);
        })

    }).catch((error1)=>{
            console.log(error1)
        })
        console.log("hello from swap owner by id function")
};//! end of swapped owner function




const CheckOutAction=async ()=>{ 
        console.log("from the checkout page ",swappedItem)
        console.log("swapped item info ",swappedItem.ownerId)
        console.log("my item info:  ",ownerId)

        if(ownerId!==swappedItem.ownerId ){//! swap action==>swapping is done then redirected to his items page
            // swapOwnersById();
            navigate("/useritems")
            console.log("swapped!!")//! to be deleted

        }else{ //! buy action==>redirected to the payment page
            navigate(`/onlinepayment/${swappedItem.id}/${swappedItem.price}/${swappedItem.country}/${swappedItem.category}/${swappedItem.ownerId}/${swappedItem.img}`) //! then once payment complete:the item will be swapped as before
            console.log("not swapped!")//! to be deleted
        
            //! modal box will be shown when pressing ok then it will be redirected to the userItems page
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
        <button onClick={()=>{CheckOutAction()}} className="btn">Proceed</button>
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