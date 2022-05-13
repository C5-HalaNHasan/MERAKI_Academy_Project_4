//! same functionality as search box
import "./filterBy.css"
import React,{useState,useContext,useEffect} from "react";
import { useNavigate} from "react-router-dom";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; 
import NavBar from "../NavBar/NavBar";
import Cards from "../Cards/Cards";
import axios from "axios";


const FilterBox=()=>{
    const {token,setToken}=useContext(TokenContext);
    const {currentUserId,setCurrentUserId}=useContext(TokenContext); 
    const [items,setItems]=useState([]);
    const [categories,setCategories]=useState([]);
    const [price,setPrice]=useState({minPrice:0,maxPrice:0});

    const [isRendered,setIsRendered]=useState(TokenContext)

    const navigate = useNavigate(); //! not used here yet

    //to render the categories dynamically (since it might be changed later in the project)
       useEffect(()=>{
           let allCategoriesUrl="http://localhost:5000/category"
            axios.get(allCategoriesUrl,{headers:{authorization:token}}).then((result)=>{
                console.log("hello from rendercategories",result.data.categories)
                setCategories(result.data.categories)
            }).catch((error)=>{
                console.log(error)
            });
       },[])

      
    //to getItemsByCategory
    const getItemsByCategory=(e)=>{
        let getByCateURL=`http://localhost:5000/items/category/${e.target.id}`
        axios.get(getByCateURL,{headers:{authorization:token}}).then((result)=>{
           if(result.data.items.length>0){
            setItems(result.data.items);
           }
        }).catch((error)=>{
            console.log(error)
        })
    }

    //to get items based whether they are for sell only or swap only
     const getItemsBySwapOrBuy=(e)=>{
        let getBySwapOrBuyURL=`http://localhost:5000/items`
        axios.get(getBySwapOrBuyURL,{headers:{authorization:token}}).then((result)=>{
           if(result.data.items.length>0){
            let filteredItems= result.data.items.filter((elem)=>{
                if(elem.sell&e.target.id==="sell"){
                    return elem;
                }else if(elem.swap&e.target.id==="swap"){
                    return elem;
                }
            })
            setItems(filteredItems);
           }
        }).catch((error)=>{
            console.log(error)
        })
    };
     //to get items in the range of minPrice & maxPrice
     const priceOnChange=(e)=>{
         let newVal=e.target.value;
         console.log(newVal)
         let targetField=e.target.name;
         setPrice({...price,[targetField]:newVal})
        //  if(price.maxPrice<=price.minPrice){//! to make the price live render but it didn't work
        //     setPrice({...price,maxPrice:price.minPrice})
        // }
     }

     //to make it live render by  price
     useEffect(()=>{ 
         let getBySwapOrBuyURL=`http://localhost:5000/items`
         axios.get(getBySwapOrBuyURL,{headers:{authorization:token}}).then((result)=>{
            if(result.data.items.length>0){
             let filteredItems= result.data.items.filter((elem)=>{
                 if(elem.price >= price.minPrice && elem.price <= price.maxPrice ){
                     return elem;
                 }
             })
             setItems(filteredItems);
             console.log(filteredItems)
            }
         }).catch((error)=>{
             console.log(error)
         })
     },[price])
     






    return <div className="fiterBox">
    <h1>this is the filterBox</h1>
    <div className="FilterItems">

    <h3>Categories</h3>
    <div className="categories">
        {categories.map((elem)=>{
            return <button id={elem._id} onClick={getItemsByCategory}>{elem.category}</button>
        })
        }
    <div className="swapORbuy">
        <button id="swap" onClick={getItemsBySwapOrBuy}>Swap</button>
        <button id="sell" onClick={getItemsBySwapOrBuy}>Buy</button>
    </div>
    <div className="byPrice">
    <input  type="text" placeholder="minPrice..." name="minPrice" onChange={priceOnChange}></input>
    <input  type="text" placeholder="maxPrice.." name="maxPrice" onChange={priceOnChange}></input>

    </div>

    </div>


    </div>
    {/* testing the rendered cards here: stil the CARDS component is not finalized but will be used here for testing only */}
    <Cards items={items} setItems={setItems} type="search"/>

    </div>
};

export default FilterBox;