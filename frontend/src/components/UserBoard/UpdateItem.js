import "./userBoard.css"
import React,{useState,useContext,useEffect} from "react";
import { useNavigate,useParams,usenavigate} from "react-router-dom";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; 
import axios from "axios";
import Cards from "../Cards/Cards";
import NavBar from "../NavBar/NavBar";

//! 19/5: UPDATE IS NOT WORKIG/KEEPS GIVING SERVER ERROR 500:
const UpdateItem=()=>{
    const {token,setToken}=useContext(TokenContext);
    let [resultMessage,setResultMessage]=useState("");
    const navigate=useNavigate();

const [itemPic,setItemPic]=useState([])
//the item updates are going to be collected in an object and sent to the backend to be checked and updated accordingly
const {id,img}=useParams();
const [itemData,setItemData]=useState({
    item:undefined,
    description:undefined,
    price:undefined,
    photos: [],
});

const changeItemPic=(e)=>{
setItemPic(e.target.files[0]);
//cloudinary is used to uplad the images==>then the url is going to be stored in the database,
const data = new FormData()
data.append("file", e.target.files[0]);
data.append("upload_preset", "rapulojk")
data.append("cloud_name","difjgm3tp")

let uploadPicUrl="https://api.cloudinary.com/v1_1/difjgm3tp/image/upload"
axios.post(uploadPicUrl,data).then((result)=>{
   setItemPic(result.data.url);
   console.log(result);
}).catch((error)=>{
   console.log(error);
})
};

const saveItemUpdatedData=(e)=>{
//with each change on the input field;the value is going to be saved
let newVal=e.target.value;
let targetField=e.target.name;
// this method is easier to detect the change on the userData and save it!
setItemData({...itemData,[targetField]:newVal})
};

//a function to update item in the database by id:
const UpdateItemInDb=(id)=>{
   setItemData({...itemData,photos:[itemPic]}); //! to be checked :supposed to be an array
   let UpdateItemUrl=`http://localhost:5000/items/${id}`
axios.put(UpdateItemUrl,{itemData},{headers:{authorization:token}}).then((result)=>{
   console.log("item updated")
   console.log(result.data) 
   navigate("/useritems")
}).catch((error)=>{
console.log(error)
})
};
//! end of update items//! not working/tested yet
  


return( <>
    <NavBar/>
    <div className="mainBox">
     <div className="registrationBox">
    <div className="firstPart">
    <img src={itemPic} />
    </div>
    <div className="secondPart">
    <h3>Update Item</h3>
    <form id="form" className="left leftCol" onSubmit={(e)=>{e.preventDefault()}}>
    <input type="text" placeholder="Item..." name="item" onChange={saveItemUpdatedData}></input>
    <input type="text" placeholder="Description..." name="description" onChange={saveItemUpdatedData}></input>
    <input type="text" placeholder="Price" name="price" onChange={saveItemUpdatedData}></input>
    <input type="file" placeholder="Item Pic..." name="photos" onChange={changeItemPic}></input>
    <button onClick={UpdateItemInDb} className="btn">Update Item</button>
    <button onClick={()=>{navigate(-1)}} className="btn">Cancel</button>

    <h3>{resultMessage}</h3> 
    </form>
    </div>
</div>
</div>
</>)

};

export default UpdateItem;



     
    
    





     

    