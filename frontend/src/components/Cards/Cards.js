import "./cards.css"
import React,{useState,useContext,useEffect} from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; 

const Cards=({items,setItems,type})=>{
    // the below three states to be used in every component for authorization and re-rendering:
    const {token,setToken}=useContext(TokenContext);
    const {currentUserId,setCurrentUserId}=useContext(TokenContext); 
    const {isRendered,setIsRendered}=useContext(TokenContext); 
    const [currentUserWishList,setCurrentUserWishList]=useState([])
    const [currentUserCart,setCurrentUserCart]=useState([])

    const navigate = useNavigate();
    console.log(items)
    setIsRendered(true)


    // a function to get the current user wishlist and cart items ids/to decide which buttons to show for each card:
    let userCartUrl="http://localhost:5000/users/user";
    useEffect(()=>{ //! the items are rendered twice/ the render is going to be invoked on change
        axios.get(userCartUrl,{headers:{authorization:token}}).then((result)=>{
            if(result.data.user.cartItems.length>0){
                let cartItemsIds=result.data.user.cartItems.map((elem)=>{
                    return elem._id;
                })
                setCurrentUserCart(cartItemsIds)
            };
            if(result.data.user.wishList.length>0){
                let wishListItemsIds=result.data.user.wishList.map((elem)=>{
                    return elem._id;
                })
                setCurrentUserWishList(wishListItemsIds)
            };
            console.log("from filtered",currentUserCart)
            
            setIsRendered(true)
        }).catch((error)=>{
            console.log(error)
        })
    },[isRendered])

    // toDo: a function to buy onClick ==> redirect the user to the deliveryPage ==> then redirected to the online payment
    // toDo: a function to swap onClick ==>redirect the user to swapWith items page==> redirect the user to the deliveryPage ==> then redirected to the online payment

    //a function to remove from wishList onClick ==>remove the item from wishList and re-render the wishListPage
    const removeFromWishList=(itemId)=>{
        let removeUrl=`http://localhost:5000/users/item/${itemId}`
        axios.delete(removeUrl,{headers:{authorization:token}}).then((result)=>{
            console.log("hello from delete from wishlist")
            console.log(result.data)
            setIsRendered(true)
        }).catch((error)=>{
            console.log(error)
        })
    };
    // a function to add to wishList list onClick ==>add the item to wishList and re-render the wishListPage 
    const addToWishList=(itemId)=>{
        let addUrl=`http://localhost:5000/users/item/${itemId}`
            axios.post(addUrl,{},{headers:{authorization:token}}).then((result)=>{
            console.log("hello from add to wishlist")
            console.log(result.data) 
            setIsRendered(true)
        }).catch((error)=>{
            console.log('FRONTEND',error)
        })
    };

    //a function to add to cart onClick ==>add the item to cart and re-render the cart page
    const addToCart=(itemId)=>{
        let addCartItemUrl=`http://localhost:5000/users/cart/${itemId}`
    axios.post(addCartItemUrl,{},{headers:{authorization:token}}).then((result)=>{
        console.log("hello from add to cart")
        console.log(result.data) 
        setIsRendered(true)
   }).catch((error)=>{
    console.log(error)
    })
    };

    //a function to remove from cart onClick ==>remove the item from cart and re-render the cart page
    const removeFromCart=(itemId)=>{
        let addCartItemUrl=`http://localhost:5000/users/cart/${itemId}`
    axios.delete(addCartItemUrl,{headers:{authorization:token}}).then((result)=>{
        console.log("hello from remove from cart")
        console.log(result.data) 
        setIsRendered(true)
   }).catch((error)=>{
    console.log(error)
    })
    };

//a function to remove item from database by id:
    const deleteItemFromDb=(itemId)=>{
        let DeleteItemUrl=`http://localhost:5000/items/${itemId}`
    axios.delete(DeleteItemUrl,{headers:{authorization:token}}).then((result)=>{
        console.log("item deleted")
        console.log(result.data) 
        setIsRendered(true)
   }).catch((error)=>{
    console.log(error)
    })
    };


//!start of update items
const [itemPic,setItemPic]=useState([])
 //the item updates are going to be collected in an object and sent to the backend to be checked and updated accordingly
 const [itemData,setItemData]=useState({
    swapConfirmed:undefined,
    isSold: undefined,
    description: undefined,
    swap: undefined,
    sell: undefined,
    photos: [],
});

const changeItemPic=(e)=>{
setItemPic(e.target.files[0]);//! not set yet
//cloudinary is used to uplad the images==>then the url is going to be stored in the database,
const data = new FormData()
data.append("file", e.target.files[0]); //!multiphotos to be added (by map function)
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
const UpdatetemInDb=(itemId)=>{
    setItemData({...itemData,photos:itemPic}); //! to be checked :supposed to be an array
    let UpdateItemUrl=`http://localhost:5000/items/${itemId}`
axios.put(UpdateItemUrl,{},{headers:{authorization:token}}).then((result)=>{
    console.log("item updated")
    console.log(result.data) 
    setIsRendered(true)
}).catch((error)=>{
console.log(error)
})
};
//! end of update items


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
            {elem.swap && elem.owner._id !=currentUserId&&<button>swap</button>}
            {elem.sell&&elem.owner._id  !=currentUserId&&<button>buy</button>}
            {type="userBoard" &&elem.owner._id ==currentUserId&&<button onClick={()=>{
                deleteItemFromDb(elem._id)
            }}>Delete Item</button>}
            {type="userBoard" &&elem.owner._id ==currentUserId&&<button onClick={()=>{
                UpdatetemInDb(elem._id)
            }}>Update Item</button>}

            {/* remove from whish list button  strats here: add the condition where the element is not in the wish list or cart*/}
            {elem.owner._id !== currentUserId && currentUserWishList.includes(elem._id)?<button onClick={()=>{
               removeFromWishList(elem._id)
            }}>Remove from WishList</button>:null}
        {/* remove from whish list button ends here*/}

        {/* add to wish list button starts here*/}
       {elem.owner._id !== currentUserId && !currentUserWishList.includes(elem._id)?<button onClick={()=>{  
             addToWishList(elem._id)
        }}>Add to WishList</button>:null}
        {/* add to wish list button ends here*/}


        {/* add to cart button starts here*/}
        {elem.owner._id !== currentUserId && !currentUserCart.includes(elem._id)?<button onClick={()=>{  
            addToCart(elem._id)
        }}>Add to Cart</button>:null}
        {/* add to cart button ends here*/}

        {/* remove from cart button starts here*/}
        {elem.owner._id !== currentUserId && currentUserCart.includes(elem._id)?<button onClick={()=>{  
              removeFromCart(elem._id)
        }}>Remove from Cart</button>:null}
        {/* remove from cart button ends here*/}

        
        </div>
    })
    }
    </div>
};

export default Cards;