import "./cards.css"
import React,{useState,useContext} from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; 

const Cards=({items,setItems,type})=>{
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
    //!written as callBack
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
    //!written as callBack
    const addToWishList=(itemId)=>{
        let addUrl=`http://localhost:5000/users/update/${itemId}`
            axios.post(addUrl,{headers:{authorization:token}}).then((result)=>{
            console.log("hello from add to list")
            console.log(result.data) //! it only gives one item from the wishList not all of them + in the searchbox component it doesn't add the item to the list
            setIsRendered(false)
        }).catch((error)=>{
            console.log(error)
        })
    };



    return <div className="cardsContainer">
    <h1>here the cards are going to be rendered</h1>
    {items.map((elem)=>{
        return <div className="card">
            <img src="{elem.item}"/>
            <h2>{elem.item}</h2>
            <h3>{elem.description}</h3>
            <h3>price:{elem.price}</h3>
            <h5>Category:{elem.category}</h5>
            <h5>Owner:{typeof elem.owner==="string"?elem.owner:elem.owner.firstName}</h5>
            <h6>Added On:{elem.addedOn.split("T")[0]}</h6>
            {elem.swap&&<button>swap</button>}
            {elem.sell&&<button>buy</button>}

            {/* remove from whish list button  strats here: add the condition where the element is not in the wish list or cart*/}
            {type==="wishList" || type==="search" &&elem.owner != currentUserId?<button onClick={()=>{
                let removeUrl=`http://localhost:5000/users/update/${elem._id}`
                axios.delete(removeUrl,{headers:{authorization:token}}).then((result)=>{
                console.log("hello from delete from list")
                console.log(result.data) 
                setIsRendered(false)
        }).catch((error)=>{
            console.log(error)
        })
            }}>Remove from WishList</button>:null}
        {/* remove from whish list button ends here*/}

        {/* add to wish list button starts here*/}
       {type==="wishList" || type==="search" && elem.owner != currentUserId?<button onClick={()=>{  
                let addUrl=`http://localhost:5000/users/update/${elem._id}`
                axios.delete(addUrl,{headers:{authorization:token}}).then((result)=>{
                console.log("hello from add to list")
                console.log(result.data) 
                setIsRendered(false)
        }).catch((error)=>{
            console.log(error)
        })
        }}>Add to WishList</button>:null}
        {/* add to wish list button ends here*/}


        {/* add to cart button starts here*/}
        {type==="wishList" || type==="search" && elem.owner != currentUserId?<button onClick={()=>{  
                let addCartUrl=`http://localhost:5000/cart/${elem._id}`
                axios.post(addCartUrl,{headers:{authorization:token}}).then((result)=>{
                console.log("hello from add to cart")
                console.log(result.data) 
                setIsRendered(false)
        }).catch((error)=>{
            console.log(error)
        })
        }}>Add to Cart</button>:null}
        {/* add to cart button ends here*/}

        {/* remove from cart button starts here*/}
        {type==="cart" && elem.owner != currentUserId?<button onClick={()=>{  
                let removeCartUrl=`http://localhost:5000/cart/${elem._id}`
                axios.delete(removeCartUrl,{headers:{authorization:token}}).then((result)=>{
                console.log("hello from remove from cart")
                console.log(result.data) 
                setIsRendered(false)
        }).catch((error)=>{
            console.log(error)
        })
        }}>Remove from Cart</button>:null}
        {/* remove from cart button ends here*/}

        
        </div>
    })
    }
    </div>
};

export default Cards;