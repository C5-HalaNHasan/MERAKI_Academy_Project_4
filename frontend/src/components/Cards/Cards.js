import "./cards.css"
import React,{useState,useContext} from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; 

const Cards=({items,type})=>{
    // the below three states to be used in every component for authorization and re-rendering:
    const {token,setToken}=useContext(TokenContext);
    const {currentUserId,setCurrentUserId}=useContext(TokenContext); 
    const {isRendered,setIsRendered}=useContext(TokenContext); 
    const navigate = useNavigate();
    console.log(items)
    setIsRendered(true)

    // toDo: a function to buy onClick ==> redirect the user to the deliveryPage ==> then redirected to the online payment
    // toDo: a function to swap onClick ==>redirect the user to swapWith items page==> redirect the user to the deliveryPage ==> then redirected to the online payment
    // toDo: a function to remove from wishList onClick ==>remove the item from wishList and re-render the wishListPage
    const removeFromWishList=(itemId)=>{
        let removeUrl=`http://localhost:5000/users/update/${itemId}`
        axios.delete(removeUrl,{headers:{authorization:token}}).then((result)=>{
            // setIsRendered(false)
            console.log("hello")
            console.log(result.data) //! it only gives one item from the wishList not all of them
        }).catch((error)=>{
            console.log(error)
        })

    };
    // toDo: a function to add to wishList list onClick ==>add the item to wishList and re-render the wishListPage
    const addToWishList=(itemId)=>{

    };



    return <div className="cardsContainer">
    <h1>here the cards are going to be rendered</h1>
    {items.map((elem)=>{
        return <div className="card">
            <img src="{elem.item}"/>
            <h2>{elem.item}</h2>
            <h3>{elem.description}</h3>
            <h5>Category:{elem.category}</h5>
            <h5>Owner:{typeof elem.owner==="string"?elem.owner:elem.owner.firstName}</h5>
            <h6>Added On:{elem.addedOn.split("T")[0]}</h6>
            {elem.swap&&<button>swap</button>}
            {elem.sell&&<button>buy</button>}
            {type==="wishList"?<button onClick={()=>{
                let removeUrl=`http://localhost:5000/users/update/${elem._id}`
                axios.delete(removeUrl,{headers:{authorization:token}}).then((result)=>{
                console.log("hello from delete from list")
                console.log(result.data) 
                setIsRendered(false)
        }).catch((error)=>{
            console.log(error)
        })

            }}>Remove from WishList</button>:<button onClick={()=>{
                let addUrl=`http://localhost:5000/users/update/${elem._id}`
                axios.post(addUrl,{headers:{authorization:token}}).then((result)=>{
                console.log("hello from add to list")
                console.log(result.data) //! it only gives one item from the wishList not all of them + in the searchbox component it doesn't add the item to the list
                setIsRendered(false)
        }).catch((error)=>{
            console.log(error)
        })
            }}>Add to WishList</button>}
        </div>
    })
    }
    </div>
};

export default Cards;