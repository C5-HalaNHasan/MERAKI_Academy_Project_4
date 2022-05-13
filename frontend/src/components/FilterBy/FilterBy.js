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
    const [isRendered,setIsRendered]=useState(TokenContext)

    const navigate = useNavigate();

    let searchByCatUrl="http://localhost:5000/category"

   /* useEffect(()=>{ //! the items are rendered twice/ the render is going to be invoked on change
        axios.get(searchUrl,{headers:{authorization:token}}).then((result)=>{
            console.log(result) //!to be deleted
            if(result&&result.data.items.length>0&&searchedItem){
               let filteredItems= result.data.items.filter((elem)=>{
                    if(elem.item.toLowerCase().includes(searchedItem.toLowerCase())){
                        return elem;
                    }
                })
                setItems(filteredItems);
                // setIsRendered(!isRendered); //! it worked but with infinite loop
            }else{
                setItems(result.data.items);
            }
            
        }).catch((error)=>{
            console.log(error)
        })
        
    },[isRendered])*/

    //to render the categories dynamically (since it might be changed later in the project)
        let allCategoriesUrl="http://localhost:5000/category"
        axios.get(allCategoriesUrl,{headers:{authorization:token}}).then((result)=>{
            console.log("hello from rendercategories",result.data.categories)
            setCategories(result.data.categories)
        }).catch((error)=>{
            console.log(error)
        });
  


    return <div className="fiterBox">
    <h1>this is the filterBox</h1>
    <div className="FilterItems">

    <h3>Categories</h3>
    <div className="categories">
        {categories.map((elem)=>{
            return <h3>{elem.category}</h3>
        })
        }
    </div>


    </div>
    {/* testing the rendered cards here: stil the CARDS component is not finalized but will be used here for testing only */}
    {/* <Cards items={items} setItems={setItems} type="search"/> */}

    </div>
};

export default FilterBox;