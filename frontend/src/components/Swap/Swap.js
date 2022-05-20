import React,{useState,useContext,useEffect} from "react";
import { useNavigate,useParams} from "react-router-dom";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; 
import axios from "axios";
import Cards from "../Cards/Cards";
import NavBar from "../NavBar/NavBar";
import ModalBox from "../ModalBox/ModalBox";



//! 19/5: TO BE CHECKED,MODALBOX TO BE SET IF THE COUNTRIES OR THE FILTERED ITEMS CRITERIA //! worked fine with useEffect 
const Swap=()=>{
    const {token,setToken}=useContext(TokenContext);
    const {currentUserId,setCurrentUserId}=useContext(TokenContext); 
    const {isRendered,setIsRendered}=useContext(TokenContext); 
    const [items,setItems]=useState([])
    const {modalBox,setModalBox}=useContext(TokenContext); 

    //to save the swapped item data so that it can be transferred to the check out page
    const {id,price,country,category,ownerId,img}=useParams();
    const {swappedItem,setSwappedItem}=useContext(TokenContext);
    const [canSwap,setCanSwap]=useState(false)

    useEffect(()=>{ 
        setSwappedItem({ 
            id:id,
            price:price,
            img:img,
            category:category,
            country:country,
            ownerId:ownerId,
        })
    },[])
    
//a function that checks if the user canSwap or not: by searching both countries and searching in the user items if he has items with value> wanted items they will be rendered after setting canSwap to true:
const canSwapThis=async (id,price,country,category,ownerId,img)=>{
    //to search for the current user country:
    let getUser="http://localhost:5000/users/user";
    await axios.get(getUser,{headers:{authorization:token}}).then((result1)=>{
        if(result1){
    //nested axios to handle all the operations:
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

            if(filteredItemsByPrice.length>0&&result1.data.user.country.toLowerCase()==country.toLowerCase()){
                setModalBox({type:"ok", message:"You can swap!",details:`you have ${filteredItemsByPrice.length} items you can swap with! select one and proceed to the delivery page!`, showModalBox:true})
                setItems(filteredItemsByPrice) 
                setCanSwap(true) 

            }else if(filteredItemsByPrice.length==0){
                setModalBox({type:"notOk", message:"You can't swap",details:"Sorry! you don't have any item equivalent to this item price!", showModalBox:true,action:"goHome"})
                setCanSwap(false) 
            
            }else if(result1.data.user.country.toLowerCase() != country.toLowerCase()){
                setModalBox({type:"notOk", message:"You can't swap",details:"Sorry! Our delivery services is only within the same country!", showModalBox:true,action:"goHome"})
                setCanSwap(false) 
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
    canSwapThis(id,price,country,category,ownerId,img);
},[canSwap])


return <div>
<NavBar/>
<Cards items={items} setItems={setItems} swappedItemId={id} type="swap"/>
</div>
};

export default Swap;



     
    
    





     

    