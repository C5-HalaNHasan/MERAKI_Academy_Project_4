import "./form.css";
import React,{useState,useContext} from "react";
import {Link,Routes,Route,useNavigate} from "react-router-dom";
import axios from "axios";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; //! to make an automatic login
import abs_wall from "../assets/abs_wall.jpg";
import NavBar from "../NavBar/NavBar";
import ModalBox from "../ModalBox/ModalBox";
import registration from "../assets/registration.jpg";




const Register=()=>{
    const {token,setToken}=useContext(TokenContext); 
    const {currentUserId,setCurrentUserId}=useContext(TokenContext); 
    const {modalBox,setModalBox}=useContext(TokenContext); 
    const {spanUserData,setSpanUserData}=useContext(TokenContext); 


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
                    localStorage.setItem("token","Bearer "+result1.data.token);
                    localStorage.setItem("currentUserId",result1.data.userId);
                    localStorage.setItem("currentUserCountry",result.data.userCountry);
                    localStorage.setItem("firstName",result1.data.userFirstName);
                    localStorage.setItem("wishList",result1.data.userWishList);
                    localStorage.setItem("cartItems",result1.data.userCartItems);
                    setSpanUserData({firstName:result.data.userFirstName,wishList:result.data.userWishList,cartItems:result.data.userCartItems});
                    setToken("Bearer "+result1.data.token);
                    setSpanUserData({firstName:result1.data.userFirstName,wishList:result1.data.userWishList,cartItems:result1.data.userCartItems});
                    navigate("/");
                }).catch((error1)=>{

                })
            }
            setModalBox({type:"ok", message: `Hi ${result.data.result.user.firstName}`,details:"Hope you will enjoy your experience with us!", showModalBox:true});

            }).catch((error)=>{
            console.log(error);
            setResultMessage(error.response.data.message);
            setModalBox({type:"notOk", message:"Unsuccessful Registration!",details:"all fields must be filled!", showModalBox:true});
        })
};


    return ( 
        <main>
        <NavBar/>
        <ModalBox/>
    <div className="mainBox">
    
    <div className="registrationBox">
     <div className="firstPart">
    <img src={registration} />
    </div>

    <div className="secondPart">
    <h3>Register</h3>
    already a member? <Link to="/login"><span>LogIn</span></Link>
    <form id="form" className="left leftCol" onSubmit={(e)=>{e.preventDefault()}}>
        <input type="text" placeholder="First Name..." name="firstName" onChange={saveData}  autoComplete="off"></input>
        <input type="text" placeholder="Last Name..." name="lastName" onChange={saveData} autoComplete="off"></input>
        <input type="text" placeholder="Contact Number..." name="contactNum" onChange={saveData} autoComplete="off"></input>
        <input type="text" placeholder="Country..." name="country" onChange={saveData} autoComplete="off"></input>
        <input type="email" placeholder="email..." name="email" onChange={saveData} autoComplete="off"></input>
        <input type="password" placeholder="Password..." name="password" onChange={saveData} autoComplete="off"></input>
        <button onClick={RegisterAction} className="btn">Register</button>
        </form>
    </div>
    </div>
    </div>
    </main>
    )

};

    
export default Register;