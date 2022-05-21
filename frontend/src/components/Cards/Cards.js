import "./cards.css"
import {AiOutlineShoppingCart,AiOutlineHeart} from "react-icons/ai";
import {IoMdSwap} from "react-icons/io";
import React,{useState,useContext,useEffect} from "react";
import axios from "axios";
import { useNavigate,Link,useParams} from "react-router-dom";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; 
import abs_wall from "../assets/abs_wall.jpg"
import ModalBox from "../ModalBox/ModalBox";


//! 19/5: parameter swappedItemiD TO BE DELETD

const Cards=({items,setItems,type,swappedItemId})=>{
    // the below three states to be used in every component for authorization and re-rendering:
    const {token,setToken}=useContext(TokenContext);
    const {currentUserId,setCurrentUserId}=useContext(TokenContext); 
    const {isRendered,setIsRendered}=useContext(TokenContext); 
    const {currentUserItems,setCurrentUserItems}=useContext(TokenContext); //! 19/5 to be deleted 
    const {currentUserCountry,setCurrentUserCountry}=useContext(TokenContext); 


    const [currentUserWishList,setCurrentUserWishList]=useState([])
    const [currentUserCart,setCurrentUserCart]=useState([])

    //to send messages by modalbox:
    const {modalBox,setModalBox}=useContext(TokenContext); 




    const navigate = useNavigate();
    console.log("items sent to the cards component",items,"type :",type) //!to console.log the items sent to the Cards component //!to be deleted

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
            console.log("from filtered",currentUserCart) //! to be deleted
            setIsRendered(true)
        }).catch((error)=>{
            console.log(error)
        })
    },[isRendered])

    //a function to remove from wishList onClick ==>remove the item from wishList and re-render the wishListPage
    const removeFromWishList=(itemId)=>{
        let removeUrl=`http://localhost:5000/users/item/${itemId}`
        axios.delete(removeUrl,{headers:{authorization:token}}).then((result)=>{
            setIsRendered(!isRendered)
        }).catch((error)=>{
            console.log(error)
        })
    };
    // a function to add to wishList list onClick ==>add the item to wishList and re-render the wishListPage 
    const addToWishList=(itemId)=>{
        let addUrl=`http://localhost:5000/users/item/${itemId}`
            axios.post(addUrl,{},{headers:{authorization:token}}).then((result)=>{
            setIsRendered(!isRendered)
        }).catch((error)=>{
            console.log(error)
        })
    };

    //a function to add to cart onClick ==>add the item to cart and re-render the cart page
    const addToCart=(itemId)=>{
        let addCartItemUrl=`http://localhost:5000/users/cart/${itemId}`
    axios.post(addCartItemUrl,{},{headers:{authorization:token}}).then((result)=>{
        console.log("hello from add to cart",result.data)
        setIsRendered(!isRendered)
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
        setIsRendered(!isRendered)
    }).catch((error)=>{
    console.log(error)
    })
    };

//a function to remove item from database by id:
    const deleteItemFromDb=(itemId)=>{
        let DeleteItemUrl=`http://localhost:5000/items/${itemId}`
    axios.delete(DeleteItemUrl,{headers:{authorization:token}}).then((result)=>{
        setModalBox({type:"alert", message:"Deleted",details:"your item has been deleted!", showModalBox:true})
        setIsRendered(!isRendered)
    }).catch((error)=>{
    console.log(error)
    })
    };


//! a condition to be added if the userCountry != elem.country no swap or buy buttons will appear!
//! item img to be rendered instead of using abs_wall
return <main>
<div className="cardsContainer">
    <ModalBox />
    {items.map((elem)=>{
        return <div className="card" key={elem._id}>
        <div className="imgSection">
            <img src={elem.photos}/> 
        </div>
        <div className="titleSection">
            <h2>{elem.item} </h2>
            <h3>Price:{elem.price}$</h3>
        </div>

        <div className="itemInfo">
          <div className="details">
            <h2>{elem.item} </h2>
            <h3>{elem.description}</h3>
            <h3>Price:{elem.price}$</h3>
            <h6>Category:{elem.category.category}</h6>
            <h6>Owner:{elem.owner.firstName}</h6>
            <h6>Added:{elem.addedOn.split("T")[0]}</h6>
          </div>

          <ul className="actionButtons"> 

            {/* buy action starts here*/}
            {elem.sell&& elem.owner._id !=currentUserId &&elem.owner.country.toLowerCase()==currentUserCountry&&<li onClick={()=>{
                navigate(`/checkout/${elem._id}/${elem.price}/${elem.owner.country}/${elem.category.category}/${elem.owner._id}/${elem.photos[0]}`)
            }}>Buy</li>}
            {/* buy action ends here*/}


            {type==="userBoard" &&elem.owner._id ==currentUserId&&<li onClick={()=>{
                deleteItemFromDb(elem._id)
            }}>Delete Item</li>}
            {type==="userBoard" &&elem.owner._id ==currentUserId&&<li onClick={()=>{
                navigate(`/updateitem/${elem._id}`)
            }}>Update Item</li>}

            {/* remove from whish list button  strats here: add the condistion where the element is not in the wish list or cart*/}
            {elem.owner._id !== currentUserId && currentUserWishList.includes(elem._id)?<li onClick={()=>{
               removeFromWishList(elem._id)
            }}>Remove from WishList</li>:null}
        {/* remove from whish list button ends here*/}

        {/* add to wish list button starts here*/}
       {elem.owner._id !== currentUserId && !currentUserWishList.includes(elem._id)?<li onClick={()=>{  
             addToWishList(elem._id)
        }}>Add to WishList</li>:null}
        {/* add to wish list button ends here*/}


        {/* add to cart button starts here*/}
        {elem.owner._id !== currentUserId && !currentUserCart.includes(elem._id)&&elem.owner.country.toLowerCase()==currentUserCountry?<li onClick={()=>{  
            addToCart(elem._id)
        }}>Add to Cart</li>:null}
        {/* add to cart button ends here*/}

        {/* remove from cart button starts here*/}
        {elem.owner._id !== currentUserId && currentUserCart.includes(elem._id)&&elem.owner.country.toLowerCase()==currentUserCountry?<li onClick={()=>{  
              removeFromCart(elem._id)
        }}>Remove from Cart</li>:null}
        {/* remove from cart button ends here/end of actionButtons div here*/}

        {/* swap action starts here */}
        {elem.owner._id !== currentUserId&&elem.owner.country.toLowerCase()==currentUserCountry&& <li onClick={()=>{navigate(`/swap/${elem._id}/${elem.price}/${elem.owner.country}/${elem.category.category}/${elem.owner._id}/${elem.photos}`)
        }}>Swap</li>}
        {/* swap action button ends here}*/}


        {/* swap button starts here /it appears in the swapped items page /swap */}
        {type==="swap"&& <li id={elem._id} onClick={()=>{
            navigate(`/checkout/${elem._id}/${elem.price}/${elem.owner.country}/${elem.category.category}/${elem.owner._id}/${elem.photos}`)
        }}>Swap With<IoMdSwap/></li>}
        {/* swap button button ends here/end of actionButtons div here*/}
        </ul>

        </div>
      
        </div>
        {/* end of array render */}
    })
    }
    </div>
    </main>
};

export default Cards;