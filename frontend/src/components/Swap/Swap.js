import "./swap.css"
import React,{useState,useContext,useEffect} from "react";
import { useNavigate,useParams} from "react-router-dom";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; 
import axios from "axios";
import Cards from "../Cards/Cards";
import NavBar from "../NavBar/NavBar";
import ModalBox from "../ModalBox/ModalBox";



// toDo: if the user has items with price >= item he would like to exchange  && they both live in the same country: the cards are going to be rendered with one button only which is swap
// toDo: when swap is pressed: 
// toDo-1:the owner of the two items will be exchanged
// toDo-2:the state of the item will be set to isSold:true so that it will not be rerenderd in the main page
// toDo-3:the user will be redirected to the deliveryPage where he enters his address so that the item will be delivered to him
// toDo-4: when the other user logs in: he will be notified with this action (also if the item has swapConfirmed set to true:extra)


//! 19/5: TO BE CHECKED,MODALBOX TO BE SET IF THE COUNTRIES OR THE FILTERED ITEMS CRITERIA
const Swap=()=>{
    const {token,setToken}=useContext(TokenContext);
    const {currentUserId,setCurrentUserId}=useContext(TokenContext); 
    const {isRendered,setIsRendered}=useContext(TokenContext); 
    const [items,setItems]=useState([])
    const {userItems,setUserItems}=useContext(TokenContext); //! not used yet
    const {modalBox,setModalBox}=useContext(TokenContext); 


    //to save the swapped item data so that it can be transferred to the check out page
    const {item,id,price,country,category,ownerId,img}=useParams();
    const {swappedItem,setSwappedItem}=useContext(TokenContext);

    useEffect(()=>{ //! 19/5 to be checked why I used useEffect?
        setSwappedItem({ 
            id:id,
            price:price,
            img:img,
            category:category,
            country:country,
            ownerId:ownerId,
            item:item,
        })
    },[])
    
    console.log(swappedItem)//!to be deleted

    //to show messages by modal box:
    const [modalBoxMessage,setModalBoxlMessage]=useState(false)//! to be handelled as context
    const [modalBoxMessageType,setModalBoxlMessageType]=useState("notOk")//! to be handelled as context
    //this state is set to true if the owner and the swapper are in the same country and the swapper has items with price >= wanted item
    const [canSwap,setCanSwap]=useState(false) //! to be deleted

//a function that checks if the user canSwap or not: by searching both countries and searching in the user items if he has items with value> wanted items they will be rendered after setting canSwap to true:
const canSwapThis=async (id,price,country,category,ownerId,img)=>{ //! TO BE CHECKED NOT WORKING AS INTENDED
    //to search for the current user country:
    let getUser="http://localhost:5000/users/user";
    await axios.get(getUser,{headers:{authorization:token}}).then((result1)=>{
        if(result1){
    //! nested axios to handle all the operations:
    //to search in the user items if he has items with a value >= wanted item:
    let allItemsURL="http://localhost:5000/items"
    axios.get(allItemsURL,  {headers: {authorization: token }}).then( (result2)=>{
        if(result2.data.items.length>0){
            let filteredItems= result2.data.items.filter((elem)=>{
                return elem.owner._id==currentUserId
            });
            let filteredItemsByPrice=  filteredItems.filter((elem)=>{ 
                 return elem.price >= price
            });

            if(filteredItemsByPrice.length>0&&result1.data.user.country==country){
                console.log("you can swap!!")//! to be deleted
                setItems(filteredItemsByPrice) 
                setCanSwap(true) //! to be deleted
                console.log(filteredItemsByPrice,"from the inside of the swap component")//! to be deleted

            }else if(filteredItemsByPrice.length==0){
                setModalBox({type:"notOk", message:"You can't swap",details:"Sorry! you don't have an item equivalent to this item price!", showModalBox:true,action:"goHome"})
                setCanSwap(false) //! to be deleted
            
            }else if(result1.data.user.country.toLowerCase() != country.toLowerCase()){
                setModalBox({type:"notOk", message:"You can't swap",details:"Sorry! Our delivery services is only within the same country!", showModalBox:true,action:"goHome"})
                setCanSwap(false) //! to be deleted
            }
           };

    }).catch((error2)=>{
        console.log(error2);
    })
    }//end if statement where all nested axios
    }).catch((error1)=>{
        console.log(error1);
    })
};


useEffect(()=>{
    canSwapThis(id,price,country);
},[canSwap])

console.log("THIS IS THE SWAP COMPONENT", items,"can he swap?? ",canSwap) //! to be deleted



return <div>
<NavBar/>
<Cards items={items} setItems={setItems} swappedItemId={id} type="swap"/>
</div>
};

export default Swap;



     
    
    





     

    