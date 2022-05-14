import "./searchBox.css"
import React,{useState,useContext,useEffect} from "react";
import { useNavigate} from "react-router-dom";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; 
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import Cards from "../Cards/Cards";


const SearchBox=({searchedItem})=>{
    console.log(searchedItem);
    const {token,setToken}=useContext(TokenContext);
    const {currentUserId,setCurrentUserId}=useContext(TokenContext); 
    const [items,setItems]=useState([]);
    const [isRendered,setIsRendered]=useState(TokenContext)

    const navigate = useNavigate();
    let searchUrl="http://localhost:5000/items"

    useEffect(()=>{ //! the items are rendered twice!!/ the render is going to be invoked on change
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
        
    },[isRendered])

    
    return <div className="SearchBox">
    <NavBar/>
    <h1>this is the SearchBox</h1>
    {/* testing the rendered cards here: stil the CARDS component is not finalized but will be used here for testing only */}
    <Cards items={items} setItems={setItems} type="search"/>

    </div>
};

export default SearchBox;