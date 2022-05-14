import "./userBoard.css"
import React,{useState,useContext,useEffect} from "react";
import { useNavigate} from "react-router-dom";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; 
import axios from "axios";
import Cards from "../Cards/Cards";
import NavBar from "../NavBar/NavBar";


const UserItems=()=>{
    const {token,setToken}=useContext(TokenContext);
    const {currentUserId,setCurrentUserId}=useContext(TokenContext); 
    const {isRendered,setIsRendered}=useContext(TokenContext); 
    const [items,setItems]=useState([]);
    let [resultMessage,setResultMessage]=useState("");


    //get user by id to show his picture in the update box:
    let getAllItemsUrl="http://localhost:5000/items"; //!to be updated
    useEffect(()=>{ //! the items are rendered twice/ the render is going to be invoked on change
        axios.get(getAllItemsUrl,{headers:{authorization:token}}).then((result)=>{
           let filteredItemsByUser= result.data.items.filter((elem)=>{
               return elem.owner._id==currentUserId;
           })
        setItems( filteredItemsByUser);
        setIsRendered(true);
        }).catch((error)=>{
            console.log(error)
        })
    },[isRendered])

    
    //!to be moved to cards component from here
        const [itemPic,setItemPic]=useState([])
        const navigate = useNavigate();
         //the item updates are going to be collected in an object and sent to the backend to be checked and updated accordingly
         const [itemData,setItemData]=useState({
            swapConfirmed:"true",
            isSold: "false",
            description: "ïn a very bad condition",
            swap: "false",
            sell: "true",
            photos: [],
        });


    const changeItemPic=(e)=>{
        setItemPic(e.target.files);//! not set yet
        //cloudinary is used to uplad the images==>then the url is going to be stored in the database,
        const data = new FormData()
        data.append("file", e.target.files); //!multiphotos to be added (by map function)
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


//! the update function is not working (same problem as addtowishlist:forbidden)
    const saveItemUpdatedData=(e)=>{
        //with each change on the input field;the value is going to be saved
        let newVal=e.target.value;
        let targetField=e.target.name;
        // this method is easier to detect the change on the userData and save it!
        setItemData({...itemData,[targetField]:newVal})
    };

    const UpdateItemAction=(itemId)=>{ //! updates should be checked before being sent
        //to save the photo uploaded by the user:
        setItemData({...itemData,photos:itemPic});
        //when the user clicks on the loginbutton: the userData is going to be sent to the BE by axios!
        let updateItemUrl=`http://localhost:5000/items/${itemId}`;
        axios.put(updateItemUrl,{headers:{authorization:token}},itemData).then((result)=>{
          console.log(result)
            if(result){
                setResultMessage(result.data.message) //to set the result message below the action button  //ñot used yet
                //! isRendered might be added here
            }
        }).catch((error)=>{
            console.log(error);
            setResultMessage(error.response.data.message); //! not used yet
        })
    };
//!
//!to be moved to cards component until here
console.log("items from the userItems",items)


return <div>
<NavBar/>
<h3>userItems</h3>
<Cards items={items} setItems={setItems} type="userBoard"/>
</div>
};

export default UserItems;



     
    
    





     

    