import "./register.css";
import React,{useState,useContext} from "react";
import {Link,Routes,Route,useNavigate} from "react-router-dom";
import axios from "axios";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; //! to make an automatic login


const Register=()=>{
    const {token,setToken}=useContext(TokenContext); 
    //to save the current userId
    const [currentUserId,setCurrentUserId]=useState()
    //the user inputs are going to be collected in an object and sent to the backend to be checked if the user exists or not: the the status of the process will be sent from the BE to the FE 
    let [userData,setUserData]=useState({
        firstName:"",
        lastName: "",
        contactNum:"",
        country:"",
        email:"",
        password:"",
        role:"627bf808a52d6cd108770573" //user role added for testing
    });
    
    //to redirect the user to the main page after a successful registration //! not used yet
    // const navigate=useNavigate();

    //to update the result message from axios //! not used yet
    let [resultMessage,setResultMessage]=useState("");

    const saveData=(e)=>{
        //with each change on the input field;the value is going to be saved
        let newVal=e.target.value;
        let targetField=e.target.name;
        // this method is easier to detect the change on the userData and save it!
        setUserData({...userData,[targetField]:newVal})
    };

    const RegisterAction=()=>{ 
        //when the user clicks on the register button: the userData is going to be sent to the BE by axios!
        let url="http://localhost:5000/users/";
        axios.post(url,userData).then((result)=>{
            // navigate("/login") //! will make the login automatically so that the user can navigate the site once registered(by using the login component here
            if(result.data.result.success == true){
                //the currentUserId is going to be saved and transferred across other components:
                let userId=result.data.result.user._id;
                localStorage.setItem("currentUserId",userId)
                setCurrentUserId(userId)

             //an automatic login in is going to be made and the user will be redirected to the main page (once created)
        axios.post("http://localhost:5000/users/login",{
            email:userData.email,
            password:userData.password,
        }).then((result1)=>{
                    let reult1Token="Bearer "+result1.data.token;
                    setToken(reult1Token);
                    localStorage.setItem("token",JSON.stringify(reult1Token));
                    //to redirect the user to the homePage
                    // navigate("/home"); //! not created yet
                })






             //!
                
            }
            console.log(result.data.result.message)

            setResultMessage(result.data.result.message) //to set the result message below the action button //! not used yet
        }).catch((error)=>{
            console.log(error);
            setResultMessage(error.response.data.message);
        })
};


    return <div className="registrationBox">
        <h3>Register:</h3>

        <input type="text" placeholder="First Name..." name="firstName" onChange={saveData}></input>
        <input type="text" placeholder="Last Name..." name="lastName" onChange={saveData}></input>
        <input type="text" placeholder="Contact Number..." name="contactNum" onChange={saveData}></input>
        <input type="text" placeholder="Country..." name="country" onChange={saveData}></input>
        <input type="email" placeholder="email..." name="email" onChange={saveData}></input>
        <input type="password" placeholder="Password..." name="password" onChange={saveData}></input>
        <button onClick={RegisterAction}>Register</button>
        <h3>{resultMessage}</h3> //! to be updated (a moving or loading component is going to be created instead of this)

    </div>
};

    
export default Register;