import "./payment.css";
import React,{useState,useContext} from "react";
import {Link,Routes,Route,useNavigate} from "react-router-dom";
import axios from "axios";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; //! to make an automatic login
import abs_wall from "../assets/abs_wall.jpg";
import NavBar from "../NavBar/NavBar";


const Payment=()=>{
    const {token,setToken}=useContext(TokenContext); 
    //to save the current userId
    const {currentUserId,setCurrentUserId}=useContext(TokenContext); 
    //the user checkOut inputs are going to be collected in an object 
    let [checkOutData,setCheckOutData]=useState({
        firstName:"",
        lastName: "",
        contactNum:"",
        country:"",
        email:"",
        password:"",
        //! other fields will be added based on the checkout form that is going to be used
    });

    const navigate=useNavigate() //! used to redirect the user to the onlinePaymentPage if he selected to pay online


    //to update the result message  //! not used yet! // a modal box will be used
    let [resultMessage,setResultMessage]=useState("");

    const saveData=(e)=>{
        //with each change on the input field;the value is going to be saved
        let newVal=e.target.value;
        let targetField=e.target.name;
        // this method is easier to detect the change on the userData and save it!
        setCheckOutData({...checkOutData,[targetField]:newVal})
    };

    const CheckOutAction=()=>{ //! NO BE FOR THIS OPERATION YET
        //when the user clicks on the register button: the userData is going to be sent to the BE by axios!
        let url="http://localhost:5000/users/";
        axios.post(url,checkOutData,).then((result)=>{
            setResultMessage(result.data.result.message) //to set the result message below the action button //! not used yet
        }).catch((error)=>{
            console.log(error);
            setResultMessage(error.response.data.message);
        })
};


    return ( 
        <>
        <NavBar/>
    <div className="mainBox">
    
    <div className="registrationBox">
     <div className="firstPart">
    <img src={abs_wall} />
    </div>

    <div className="secondPart">
    <h3>Register</h3>
    <span>already a member?<span><Link to="/login"> LogIn</Link></span></span>
    <form id="form" className="left leftCol" onSubmit={(e)=>{e.preventDefault()}}>
        <input type="text" placeholder="First Name..." name="firstName" onChange={saveData}></input>
        <input type="text" placeholder="Last Name..." name="lastName" onChange={saveData}></input>
        <input type="text" placeholder="Contact Number..." name="contactNum" onChange={saveData}></input>
        <input type="text" placeholder="Country..." name="country" onChange={saveData}></input>
        <input type="email" placeholder="email..." name="email" onChange={saveData}></input>
        <input type="password" placeholder="Password..." name="password" onChange={saveData}></input>
        <button onClick={CheckOutAction} className="btn">Register</button>
        <h3>{resultMessage}</h3> 
        </form>
        {/* //! to be updated (a modalBox with settime out is going to be shown) */}
    </div>
    </div>
    </div>
    </>
    )

};

    
export default Payment;