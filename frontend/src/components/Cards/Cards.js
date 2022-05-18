import "./cards.css"
import {AiOutlineShoppingCart,AiOutlineHeart} from "react-icons/ai";
import {IoMdSwap} from "react-icons/io";
import React,{useState,useContext,useEffect} from "react";
import axios from "axios";
import { useNavigate,Link,useParams} from "react-router-dom";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; 
import abs_wall from "../assets/abs_wall.jpg"
import ModalBox from "../ModalBox/ModalBox";
import Swap from "../Swap/Swap";
import UserItems from "../UserBoard/UserItems";



const Cards=({items,setItems,type,swappedItemId})=>{
    // the below three states to be used in every component for authorization and re-rendering:
    const {token,setToken}=useContext(TokenContext);
    const {currentUserId,setCurrentUserId}=useContext(TokenContext); 
    const {isRendered,setIsRendered}=useContext(TokenContext); 
    const {currentUserItems,setCurrentUserItems}=useContext(TokenContext); 
    const [currentUserWishList,setCurrentUserWishList]=useState([])
    const [currentUserCart,setCurrentUserCart]=useState([])

    //to set the modal box visibility:
    const [showModalBox,setShowModalBox]=useState(false)
    //to show messages by modal box:
    const [modalBoxMessage,setModalBoxlMessage]=useState(false)
    const [modalBoxMessageType,setModalBoxlMessageType]=useState("notOk")
    //this state is set to true if the owner and the swapper are in the same country and the swapper has items with price >= wanted item
    const [canSwap,setCanSwap]=useState(false)




    const navigate = useNavigate();
    console.log("items sent to the cards component",items,"type :",type) //!to console.log the items sent to the Cards component

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
            setIsRendered(!isRendered)
            // setIsAdded(!isAdded)
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
            setIsRendered(!isRendered)
            // setIsAdded(!isAdded)

        }).catch((error)=>{
            console.log('FRONTEND',error) //!
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
        console.log("item deleted")
        console.log(result.data) 
        setIsRendered(!isRendered)
    }).catch((error)=>{
    console.log(error)
    })
    };


//!start of update items function //! NOT WORKING/TESTED YET
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
    setIsRendered(!isRendered)
}).catch((error)=>{
console.log(error)
})
};
//! end of update items//! not working/tested yet


//a function that checks if the user canSwap or not: by searching both countries and searching in the user items if he has items with value> wanted items they will be rendered after setting canSwap to true:

//!this function is moved to the swap component
const canSwapThis=async (ClickedItemId,clickedItemCountry,ClickedItemPrice)=>{
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
                 return elem.price >= ClickedItemPrice 
            });

            if(filteredItems){
            if(filteredItemsByPrice.length>0&&result1.data.user.country===clickedItemCountry){
                navigate(`/swap/${ClickedItemId}`)
                setItems(filteredItemsByPrice) //! items
                setCanSwap(true) 

            }else if(filteredItemsByPrice.length==0){
                setCanSwap(false) 
                setModalBoxlMessage("Sorry! you don't have an item equivalent to this item price!")
                setModalBoxlMessageType("notOk")
            }else if(result1.data.user.country.toLowerCase() != clickedItemCountry.toLowerCase()){
                setCanSwap(false) 
                setModalBoxlMessage("Sorry! Our delivery services is only within the same country!")
                setModalBoxlMessageType("notOk")
            }
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

//toDo:before swap operation is done:
//once clicked the button:the user will be redirected to the address page to deliver the item for him
//the location page has two buttons:cancel that will return to the homepage ,and proceed that will make the swap action then redirect the user to the home page

//! same problem as before! keeps giving undefined :"(
//swapping the owners of the items and setting the isSold:true  //! swap is working FINALLY :")
const swapOwnersById=async (myItemId)=>{ //! this will be handelled once the user agrees on the modalBox message
    let yourItemUrl=`http://localhost:5000/items/${swappedItemId}`
    let myItemUrl=`http://localhost:5000/items/${myItemId}`

      //get the clickeditem owner by its id:
      await axios.get(yourItemUrl,{headers:{authorization:token}}).then(async (result1)=>{
        if(result1){
            console.log("current owner of the wanted item",result1.data.item) //!to be deleted

    //update the old:
     await axios.put(myItemUrl,{owner:result1.data.item.owner,isSold:"true"},{headers:{authorization:token}}).then(async (result2)=>{
        console.log("new owner of the wanted item",result2.data.item," which should match the current userId") //!to be deleted

    //update the clicked item owner: from old to me:
    await axios.put(yourItemUrl,{owner:currentUserId,isSold:"true"},{headers:{authorization:token}}).then(async (result3)=>{
        console.log("my new item in the list owner",result3.data.item," which should match the current userId whish is me") //!to be deleted

    }).catch((error3)=>{
    console.log(error3)
    });

    }).catch((error2)=>{
    console.log(error2)
    });

    } //end of if result1 statement
     }).catch((error1)=>{
         console.log(error1)
     });
};


    return <div className="cardsContainer">
    {/* <h1>here the cards are going to be rendered</h1> */}
    
    <button onClick={()=>{ //! for testing to be deleted
        setShowModalBox(true);
    }}>show modal box </button>
    <ModalBox showModalBox={showModalBox} setShowModalBox={setShowModalBox} message={"hello from the cards component"}/>

    {items.map((elem)=>{
        return <div className="card" key={elem._id}>
        <div className="imgSection">
            <img src={abs_wall}/>
        </div>

        <div className="itemInfo">
          <div className="details">
            <h2>{elem.item} </h2>
            <h3>price:{elem.price}</h3>
            <h3>{elem.description}</h3>
            <h5>Category:{elem.category.category}</h5>
            <h5>Owner:{elem.owner.firstName}</h5>
            <h6>Added On:{elem.addedOn.split("T")[0]}</h6>
          </div>

          <ul className="actionButtons"> 

            {elem.sell&&elem.owner._id  !=currentUserId&&<li><Link to=""/>buy</li>}
            {type==="userBoard" &&elem.owner._id ==currentUserId&&<li onClick={()=>{
                deleteItemFromDb(elem._id)
            }}><Link to=""/>Delete Item</li>}
            {type==="userBoard" &&elem.owner._id ==currentUserId&&<li onClick={()=>{
                UpdatetemInDb(elem._id)
            }}><Link to=""/>Update Item</li>}

            {/* remove from whish list button  strats here: add the condition where the element is not in the wish list or cart*/}
            {elem.owner._id !== currentUserId && currentUserWishList.includes(elem._id)?<li onClick={()=>{
               removeFromWishList(elem._id)
            }}><Link to=""/>Remove from WishList</li>:null}
        {/* remove from whish list button ends here*/}

        {/* add to wish list button starts here*/}
       {elem.owner._id !== currentUserId && !currentUserWishList.includes(elem._id)?<li onClick={()=>{  
             addToWishList(elem._id)
        }}><Link to=""/>Add to WishList</li>:null}
        {/* add to wish list button ends here*/}


        {/* add to cart button starts here*/}
        {elem.owner._id !== currentUserId && !currentUserCart.includes(elem._id)?<li onClick={()=>{  
            addToCart(elem._id)
        }}><Link to=""/>Add to Cart</li>:null}
        {/* add to cart button ends here*/}

        {/* remove from cart button starts here*/}
        {elem.owner._id !== currentUserId && currentUserCart.includes(elem._id)?<li onClick={()=>{  
              removeFromCart(elem._id)
        }}><Link to=""/>Remove from Cart</li>:null}
        {/* remove from cart button ends here/end of actionButtons div here*/}

        {/* swap action starts here*/}
        {elem.owner._id !== currentUserId&& <li onClick={()=>{navigate(`/swap/${elem._id}/${elem.price}/${elem.owner.country}`)  
        }}>SWAP</li>}
        {/* swap action button ends here}*/}


        {/* swap button starts here /it appears in the swapped items page /swap */}
        {type==="swap"&& <li id={elem._id} onClick={()=>{ swapOwnersById(elem._id)  //!modalBox
        }}><IoMdSwap/></li>}
        {/* swap button button ends here/end of actionButtons div here*/}
        </ul>

        </div>
      
        </div>
        {/* end of array render */}
    })
    }
    </div>
};

export default Cards;