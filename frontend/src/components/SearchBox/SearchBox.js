import "./searchBox.css"
import React,{useState,useContext,useEffect} from "react";
import { useNavigate} from "react-router-dom";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; 
import NavBar from "../NavBar/NavBar";
import Cards from "../Cards/Cards";
import axios from "axios";


const SearchBox=({searchedItem})=>{
    console.log(searchedItem);
    const {token,setToken}=useContext(TokenContext);
    const {currentUserId,setCurrentUserId}=useContext(TokenContext); 
    const [items,setItems]=useState([]);
    const [isRendered,setIsRendered]=useState(TokenContext)

    const navigate = useNavigate();
    let searchUrl="http://localhost:5000/items"

    useEffect(()=>{ //! the items are rendered twice/ the render is going to be invoked on change
        axios.get(searchUrl,{headers:{authorization:token}}).then((result)=>{
            console.log(result)
            if(result&&result.data.items.lenght !=0&&searchedItem){
                result.data.items.forEach((elem)=>{
                    if(elem.title==searchedItem){
                        setItems(searchedItem);
                        setIsRendered(true);
                    }
                })
            }else{
                setItems(items);
                setIsRendered(true);

            }
            
            console.log(items)
      
        }).catch((error)=>{
            console.log(error)
        })
        
    },[isRendered])

    
    return <div className="HomePage">
    <NavBar/>
    <h1>this is the SearchBox</h1>
    {/* testing the rendered cards here: stil the CARDS component is not finalized but will be used here for testing only */}
    <Cards items={items} type="search"/>

    </div>
};

export default SearchBox;