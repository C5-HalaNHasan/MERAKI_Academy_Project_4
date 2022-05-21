import "./userBoard.css"
import React,{useState,useContext,useEffect} from "react";
import { useNavigate,useParams,usenavigate} from "react-router-dom";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; 
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import ModalBox from "../ModalBox/ModalBox";
import addItem from "../assets/addItem.jpg"

const AddItem=()=>{
    const {token,setToken}=useContext(TokenContext);
    let [resultMessage,setResultMessage]=useState("");
    const {modalBox,setModalBox}=useContext(TokenContext); 
    const navigate=useNavigate();

const [itemPic,setItemPic]=useState()
//the item added data are going to be collected in an object and sent to the backend to be added accordingly
const [itemData,setItemData]=useState({
    item:undefined,
    description:undefined,
    category:undefined,
    price:undefined,
    photos:undefined,
    swap:"true",
    sell:"true",
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
   setItemData({...itemData,photos:result.data.url});
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
const addItemInDb=()=>{
   setItemData({...itemData,photos:itemPic}); 
   let createItemUrl=`http://localhost:5000/items`
axios.post(createItemUrl,itemData,{headers:{authorization:token}}).then((result)=>{

   setModalBox({type:"ok", message:`${result.data.result.item.item}`,details:`${result.data.result.item.item} is successfully added to your items!`, showModalBox:true});
   navigate("/useritems")
}).catch((error)=>{
   setModalBox({type:"notOk", message:"Can't Add your Item!",details:"Please fill all the fields!",showModalBox:true}); 
   console.log(error)
})
};
  


return( <>
    <NavBar/>
    <ModalBox/>
    <div className="mainBox">
     <div className="registrationBox">
    <div className="firstPart">
    {itemPic?<img src={itemPic}/>:<img src={addItem}/>}
    </div>
    <div className="secondPart">
    <h3>Add New Item</h3>
    <form id="form" className="left leftCol" onSubmit={(e)=>{e.preventDefault()}}>
    <input type="text" placeholder="Item..." name="item" onChange={saveItemUpdatedData} autoComplete="off"></input>
    <input type="text" placeholder="Description..." name="description" onChange={saveItemUpdatedData} autoComplete="off"></input>

    <input type="text" placeholder="Price" name="price" onChange={saveItemUpdatedData} autoComplete="off"></input>
    <input type="file" placeholder="Item Pic..." name="photos" onChange={changeItemPic} autoComplete="off"></input>
    
    <div className="categoryList">
   <label for="category">Category
   <select name="category" id="category"  onChange={saveItemUpdatedData}>
    <option value="627f8c687b629f6fa60a2fed" name="category">Vehicles</option>
    <option value="627f8c6e7b629f6fa60a2ff0" name="category">Hiking Gears</option>
    <option value="627f8c757b629f6fa60a2ff3" name="category">Musical Instruments</option>
    <option value="627f8c7c7b629f6fa60a2ff6" name="category">Electronics</option>
    <option value="627f8c827b629f6fa60a2ff9" name="category">Clothes</option>
   </select></label>
   </div>

    <div className="yesNoSelection">
    <label for="swap">Swap?
   <select name="swap" id="swap" onChange={saveItemUpdatedData}>
    <option value="true">Yes</option>
    <option value="false">No</option>
   </select></label>

   <label for="sell">Sell?
   <select name="sell" id="sell"  onChange={saveItemUpdatedData}>
    <option value="true">Yes</option>
    <option value="false">No</option>
   </select></label>
   </div>
    <button onClick={addItemInDb} className="btn">Add Item</button>
    <button onClick={()=>{navigate(-1)}} className="btn">Cancel</button>

    <h3>{resultMessage}</h3> 
    </form>
    </div>
</div>
</div>
</>)

};

export default AddItem;



     
    
    





     

    