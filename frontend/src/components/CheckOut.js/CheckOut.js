import React,{useState,useContext,useEffect} from "react";
import {Link,Routes,Route,useNavigate,useParams} from "react-router-dom";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; 
import cart from "../assets/cart.jpg";
import NavBar from "../NavBar/NavBar";
import ModalBox from "../ModalBox/ModalBox";


const CheckOut=()=>{
    const {token,setToken}=useContext(TokenContext); 
    //to save the current userId
    const {currentUserId,setCurrentUserId}=useContext(TokenContext); 
    const {modalBox,setModalBox}=useContext(TokenContext); 
    const {isRendered,setIsRendered}=useContext(TokenContext);
    //to save the swapped item data so that it can be transferred to the check out page
    const {id,price,country,category,ownerId}=useParams();//this is my item info if swap is clicked
    const {swappedItem,setSwappedItem}=useContext(TokenContext);//this is the swapped item info if swap is clicked
    

    const navigate=useNavigate()
//:the owners of the items and setting the isSold:true
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
        navigate("/useritems")
};//end of swapped owner function



//a function to remove item from database by id:
const deleteItemFromDb=(itemId)=>{
    let DeleteItemUrl=`http://localhost:5000/items/${itemId}`
axios.delete(DeleteItemUrl,{headers:{authorization:token}}).then((result)=>{

    setIsRendered(!isRendered)
    navigate("/")
    // setModalBox({type:"ok", message:"Successful Payment",details:"Get ready!your item will be delivered in a few days!", showModalBox:true}) 
}).catch((error)=>{
console.log(error)
})
};

const buyAction=(tokenPay)=>{
    const body={
        tokenPay,
        item:"",
    };
    const headers={
        "Content-Type":"application/json",
        authorization:token,
    };
    let paymentUrl="http://localhost:5000/items/buy"
    axios.post(paymentUrl,body,headers).then((result)=>{
        console.log("payment is done",result)

    }).catch((error)=>{
        console.log(error)
    });
};



const CheckOutAction=()=>{ 
        if(ownerId!==swappedItem.ownerId ){
            swapOwnersById(); 
        }else{ 
            deleteItemFromDb(id);
        }
};


return ( 
        <>
        <NavBar/>
    <div className="mainBox">
    
    <div className="registrationBox">
     <div className="firstPart">
    <img src={cart} /> 
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
        {ownerId==currentUserId&&<button onClick={()=>{CheckOutAction()}} className="btn">Proceed SWAPPING</button>}
        <button onClick={()=>{navigate(-1)}} className="btn">Cancel</button>
        {/* action to be checked */}
        {ownerId!=currentUserId&&<StripeCheckout stripeKey="pk_test_51L19d0B6UNWpymKvotIty0vQIXPdDEABTSctm5BgKlIWyLmHoJTq3gC20TjcxmV9cm63sHWvwnDQA2zUlRMcsQDR00A7FLa0CA" tokenPay={()=>{CheckOutAction()}} name="Online Payment" amount={parseInt(price)*100}><button onClick={()=>{deleteItemFromDb(id)}} className="btn">BUY NOW!</button></StripeCheckout>}
        </form>
    </div>
    </div>
    </div>
    </>
    )

};

    
export default CheckOut;