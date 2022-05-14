import "./userBoard.css"
import React,{useState,useContext,useEffect} from "react";
import { useNavigate} from "react-router-dom";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; 
import axios from "axios";
import NavBar from "../NavBar/NavBar";

const UserBoard=()=>{
    const {token,setToken}=useContext(TokenContext);
    const {currentUserId,setCurrentUserId}=useContext(TokenContext); 
    const {isRendered,setIsRendered}=useContext(TokenContext); 
    const [items,setItems]=useState([]);
    let [resultMessage,setResultMessage]=useState("");
    const [userPic,setUserPic]=useState("")
    const navigate = useNavigate();
     //the user updates are going to be collected in an object and sent to the backend to be checked if trhe user exists or not: the the status of the process will be sent from the BE to the FE 
     const [userData,setUserData]=useState({
        password:null,
        firstName:null,
        lastName:null,
        photo:null,
        country:null,
        contactNum :null,
    });

    //get user by id to show his picture in the update box:
    let getUserUrl="http://localhost:5000/users/user";
    useEffect(()=>{ //! the items are rendered twice/ the render is going to be invoked on change
        axios.get(getUserUrl,{headers:{authorization:token}}).then((result)=>{
            setUserPic(result.data.user.photo)
            setIsRendered(true)
            console.log("from the get user photo",result.data.user) //! to be deleted
            console.log(result.data.user.photo) //! it only gives one item from the wishList not all of them
        }).catch((error)=>{
            console.log(error)
        })
        
    },[isRendered])


    const changeProfilePic=(e)=>{
        setUserPic(e.target.files[0]);//! not set yet
        //cloudinary is used to uplad the images==>then the url is going to be stored in the database,
        const data = new FormData()
        data.append("file", e.target.files[0]);
        data.append("upload_preset", "rapulojk")
        data.append("cloud_name","difjgm3tp")

        let uploadPicUrl="https://api.cloudinary.com/v1_1/difjgm3tp/image/upload"
        axios.post(uploadPicUrl,data).then((result)=>{
            setUserPic(result.data.url);
            console.log(result);
        }).catch((error)=>{
            console.log(error);
        })

    };


//! the update function is not working (same problem as addtowishlist:forbidden)
    const saveUserUpdatedData=(e)=>{
        //with each change on the input field;the value is going to be saved
        let newVal=e.target.value;
        let targetField=e.target.name;
        // this method is easier to detect the change on the userData and save it!
        setUserData({...userData,[targetField]:newVal})
    };

    const UpdateUserAction=()=>{ //! updates should be checked before being sent
        //to save the photo uploaded by the user:
        setUserData({...userData,photo:userPic});
        //when the user clicks on the loginbutton: the userData is going to be sent to the BE by axios!
        let updateUserUrl="http://localhost:5000/users/update/";
        axios.put(updateUserUrl,{headers:{authorization:token}},userData).then((result)=>{
          console.log(result)
            if(result){
                setResultMessage(result.data.message) //to set the result message below the action button  //ñot used yet
            }
        }).catch((error)=>{
            console.log(error);
            setResultMessage(error.response.data.message); //! not used yet
        })
    };
//!

    // userBoard page is going to be divided into two parts: update profile & update items:
    return <>
    <NavBar/>

     <div className="registrationBox">
    <div className="firstPart">
    <img src={userPic} />
    </div>
    <div className="secondPart">
    <h3>Update Profile</h3>
    <form id="form" className="left leftCol" onSubmit={(e)=>{e.preventDefault()}}>
    <input type="text" placeholder="First Name..." name="firstName" onChange={saveUserUpdatedData}></input>
    <input type="text" placeholder="Last Name..." name="lastName" onChange={saveUserUpdatedData}></input>
    <input type="text" placeholder="Country..." name="country" onChange={saveUserUpdatedData}></input>
    <input type="text" placeholder="Contact Number..." name="contactNum" onChange={saveUserUpdatedData}></input>
    <input type="password" placeholder="Password..." name="password" onChange={saveUserUpdatedData}></input>
    <input type="file" placeholder="Profile Pic..." name="photo" onChange={changeProfilePic}></input>
    <button onClick={ UpdateUserAction} className="btn">Update Profile</button>
    <h3>{resultMessage}</h3> 
    {/* //! to be updated (a moving or loading component is going to be created instead of this) */}
    </form>
    </div>
</div>
</>
};

export default UserBoard;



     
    
    





     

    