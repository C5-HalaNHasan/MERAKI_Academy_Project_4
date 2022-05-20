import "./form.css";
import React,{useState,useContext} from "react";
import {Link,Routes,Route,useNavigate} from "react-router-dom";
import axios from "axios";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; //! to make an automatic login
import abs_wall from "../assets/abs_wall.jpg";
import NavBar from "../NavBar/NavBar";
import ModalBox from "../ModalBox/ModalBox";



const Register=()=>{
    const {token,setToken}=useContext(TokenContext); 
    const {currentUserId,setCurrentUserId}=useContext(TokenContext); 
    const {modalBox,setModalBox}=useContext(TokenContext); 

    //the user inputs are going to be collected in an object and sent to the backend to be checked if the user exists or not: the the status of the process will be sent from the BE to the FE 
    let [userData,setUserData]=useState({
        firstName:"",
        lastName: "",
        contactNum:"",
        country:"",
        email:"",
        password:"",
        role:"627f8bde42534475c03d4d23" //user role added for testing //!to be updated when deleting the database
    });

    const navigate=useNavigate()


    //to update the result message from axios 
    let [resultMessage,setResultMessage]=useState("");

    const saveData=(e)=>{
        //with each change on the input field;the value is going to be saved
        let newVal=e.target.value;
        let targetField=e.target.name;
        // this method is easier to detect the change on the userData and save it!
        setUserData({...userData,[targetField]:newVal})
    };

    const RegisterAction=async ()=>{ 
        //when the user clicks on the register button: the userData is going to be sent to the BE by axios!
        let url="http://localhost:5000/users/";
        await axios.post(url,userData).then(async (result)=>{
            // will make the login automatically so that the user can navigate the site once registered(by using the login component here
            if(result.data.result.success == true){
                //the currentUserId is going to be saved and transferred across other components:
                let userId=result.data.result.user._id;
                localStorage.setItem("currentUserId",userId)
                setCurrentUserId(userId)
              

    //an automatic login in is going to be made and the user will be redirected to the main page (once created)
        await axios.post("http://localhost:5000/users/login",{
            email:userData.email,
            password:userData.password,
        }).then(async (result1)=>{
                    let reult1Token="Bearer "+result1.data.token;
                    localStorage.setItem("token",reult1Token);
                    setToken(reult1Token);
                    navigate("/");
                }).catch((error1)=>{

                })
            }
            setModalBox({type:"ok", message: `Hi ${result.data.result.user.firstName}`,details:"Hope you will engoy your experience with us!", showModalBox:true});

            }).catch((error)=>{
            console.log(error);
            setResultMessage(error.response.data.message);
            setModalBox({type:"notOk", message:"Unsuccessful Registration!",details:"all fields must be filled!", showModalBox:true});
        })
};


    return ( 
        <>
        <NavBar/>
        <ModalBox/>
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
        <button onClick={RegisterAction} className="btn">Register</button>
        </form>
    </div>
    </div>
    </div>
    </>
    )

};

    
export default Register;