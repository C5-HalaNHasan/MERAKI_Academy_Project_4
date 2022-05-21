import "./userBoard.css"
import React,{useState,useContext,useEffect} from "react";
import { useNavigate} from "react-router-dom";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; 
import axios from "axios";
import NavBar from "../NavBar/NavBar";

const UserProfile=()=>{
    const {token,setToken}=useContext(TokenContext);
    const {currentUserId,setCurrentUserId}=useContext(TokenContext); 
    const {isRendered,setIsRendered}=useContext(TokenContext); 
    const [items,setItems]=useState([]);
    let [resultMessage,setResultMessage]=useState("");
    const [userPic,setUserPic]=useState("")
    const navigate = useNavigate();
     //the user updates are going to be collected in an object and sent to the backend to be checked if trhe user exists or not: the the status of the process will be sent from the BE to the FE 
     const [userData,setUserData]=useState({
        password:undefined,
        firstName:undefined,
        lastName:undefined,
        photo:undefined,
        country:undefined,
        contactNum :undefined,
    });

    //get user by id to show his picture in the update box:
    let getUserUrl="http://localhost:5000/users/user";
    useEffect(()=>{
        axios.get(getUserUrl,{headers:{authorization:token}}).then((result)=>{
            setUserPic(result.data.user.photo)
            setIsRendered(true)
        }).catch((error)=>{
            console.log(error)
        })
    },[isRendered])


    const changeProfilePic=(e)=>{
        setUserPic(e.target.files[0]);
        //cloudinary is used to uplad the images==>then the url is going to be stored in the database,
        const data = new FormData()
        data.append("file", e.target.files[0]);
        data.append("upload_preset", "rapulojk")
        data.append("cloud_name","difjgm3tp")
        let uploadPicUrl="https://api.cloudinary.com/v1_1/difjgm3tp/image/upload"
        axios.post(uploadPicUrl,data).then((result)=>{
            setUserPic(result.data.url);
        }).catch((error)=>{
            console.log(error);
        })
    };


    const saveUserUpdatedData=(e)=>{
        //with each change on the input field;the value is going to be saved
        let newVal=e.target.value;
        let targetField=e.target.name;
        // this method is easier to detect the change on the userData and save it!
        setUserData({...userData,[targetField]:newVal})
    };

    const UpdateUserAction=()=>{
        //to save the photo uploaded by the user:
        setUserData({...userData,photo:userPic});
        //when the user clicks on the loginbutton: the userData is going to be sent to the BE by axios!
        let updateUserUrl="http://localhost:5000/users/update/";
        axios.put(updateUserUrl,userData,{headers:{authorization:token}}).then((result)=>{
            if(result){
                setResultMessage(result.data.message) //to set the result message below the action button  //ñot used yet
                navigate("/")
            }
        }).catch((error)=>{
            console.log(error);
            setResultMessage(error.response.data.message); 
        })
    };


    return( <>
    <NavBar/>
    <div className="mainBox">
     <div className="registrationBox">
    <div className="firstPart">
    <img src={userPic} />
    </div>
    <div className="secondPart">
    <h3>Update Profile</h3>
    <form id="form" className="left leftCol" onSubmit={(e)=>{e.preventDefault()}}>
    <input type="text" placeholder="First Name..." name="firstName" onChange={saveUserUpdatedData} autoComplete="off"></input>
    <input type="text" placeholder="Last Name..." name="lastName" onChange={saveUserUpdatedData} autoComplete="off"></input>
    <input type="text" placeholder="Country..." name="country" onChange={saveUserUpdatedData} autoComplete="off"></input>
    <input type="text" placeholder="Contact Number..." name="contactNum" onChange={saveUserUpdatedData} autoComplete="off"></input>
    <input type="password" placeholder="Password..." name="password" onChange={saveUserUpdatedData} autoComplete="off"></input>
    <input type="file" placeholder="Profile Pic..." name="photo" onChange={changeProfilePic} autoComplete="off"></input>
    <button onClick={ UpdateUserAction} className="btn">Update Profile</button>
    <h3>{resultMessage}</h3> 
    </form>
    </div>
</div>
</div>
</>)
};

export default UserProfile;



     
    
    





     

    