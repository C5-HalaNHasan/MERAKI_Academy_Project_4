import "./login.css";
import React,{useState,useContext} from "react";
import {Link,Routes,Route,useNavigate} from "react-router-dom";
import axios from "axios";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js";

const Login=()=>{
    const {token,setToken}=useContext(TokenContext); 
    //the user inputs are going to be collected in an object and sent to the backend to be checked if trhe user exists or not: the the status of the process will be sent from the BE to the FE 
    const [userData,setUserData]=useState({
        email:"",
        password:"",
    });

    const navigate=useNavigate() //! not used here yet

    //to update the result message from axios
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
                //token will be stored in the local storage to be used in other requests
                localStorage.setItem("token",JSON.stringify(reultToken));
                setResultMessage(result.data.message) //to set the result message below the action button 

                //to redirect the user to the homePage
                navigate("/"); 
            }
        }).catch((error)=>{
            //to remove the preset token
            setToken(null);
            localStorage.clear();//! to remove the userId and token
            setResultMessage(error.response.data.message);
        })
    };

    return <div className="loginBox">
    <h3>Login:</h3>
    <input type="email" placeholder="email..." name="email" onChange={saveData}></input>
    <input type="password" placeholder="Password..." name="password" onChange={saveData}></input>
    <button onClick={LoginAction}>Login</button>
    <h3>{resultMessage}</h3> //! to be updated (a moving or loading component is going to be created instead of this)
</div>;

}

export default Login;