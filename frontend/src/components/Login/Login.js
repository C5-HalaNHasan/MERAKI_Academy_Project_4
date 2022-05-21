import React,{useState,useContext, useEffect} from "react";
import {Link,Routes,Route,useNavigate} from "react-router-dom";
import axios from "axios";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js";
import abs_wall from "../assets/abs_wall.jpg"
import NavBar from "../NavBar/NavBar";
import ModalBox from "../ModalBox/ModalBox";
import login from "../assets/logIn.jpg";




const Login=()=>{
  //to save the current user id & token
    const {token,setToken}=useContext(TokenContext); 
    const {currentUserId,setCurrentUserId}=useContext(TokenContext); 
    const {currentUserCountry,setCurrentUserCountry}=useContext(TokenContext); 
    const navigate=useNavigate();
    const {modalBox,setModalBox}=useContext(TokenContext); 
    const {spanUserData,setSpanUserData}=useContext(TokenContext); 

    


    //the user inputs are going to be collected in an object and sent to the backend to be checked if trhe user exists or not: the the status of the process will be sent from the BE to the FE 
    const [userData,setUserData]=useState({
        email:"",
        password:"",
    });


    //to update the result message from axios:
     let [resultMessage,setResultMessage]=useState("");
    
    const saveData=(e)=>{
        //with each change on the input field;the value is going to be saved
        let newVal=e.target.value;
        let targetField=e.target.name;
        // this method is easier to detect the change on the userData and save it!
        setUserData({...userData,[targetField]:newVal})
    };
    
     const LoginAction=()=>{ 
        //when the user clicks on the loginbutton: the userData is going to be sent to the BE by axios!
        let url="http://localhost:5000/users/login";
        axios.post(url,userData).then((result)=>{
          console.log(result)
            if(result){
                let reultToken="Bearer "+result.data.token;
                setToken(reultToken);
                setCurrentUserId(result.data.userId);
                //token will be stored in the local storage to be used in other requests
                localStorage.setItem("token",reultToken);
                localStorage.setItem("currentUserId",result.data.userId);
                localStorage.setItem("currentUserCountry",result.data.userCountry);
                localStorage.setItem("firstName",result.data.userFirstName);
                localStorage.setItem("wishList",result.data.userWishList);
                localStorage.setItem("cartItems",result.data.userCartItems);
                setSpanUserData({firstName:result.data.userFirstName,wishList:result.data.userWishList,cartItems:result.data.userCartItems});

                setResultMessage(result.data.message) //to set the result message below the action button 
                //to redirect the user to the homePage
                navigate("/"); 
            }
        }).catch((error)=>{
            //to remove the preset token and saved user data
            setToken(null);
            setCurrentUserId(null);
            setCurrentUserCountry(null);
            localStorage.clear();
            setResultMessage(error.response.data.message);
            setModalBox({type:"notOk", message:"Unsuccessful Login!",details:`${resultMessage}`, showModalBox:true});
        })
    };

    return (
        <>
        <NavBar/>
        <ModalBox/>
    <div className="mainBox">
    <div className="registrationBox">

    <div className="firstPart">
    <img src={login} />
    </div>

    <div className="secondPart">
    <h3>Login</h3>
    Not a member yet? <span><Link to="/register">Register</Link></span>
    <form id="form" className="left leftCol" onSubmit={(e)=>{e.preventDefault()}}>
    <input type="email" placeholder="email..." name="email" onChange={saveData}></input>
    <input type="password" placeholder="Password..." name="password" onChange={saveData}></input>
    <button onClick={LoginAction} className="btn">Login</button>
    </form>
    </div>
</div>;
    </div> 
    </>)

};

export default Login;


     

    