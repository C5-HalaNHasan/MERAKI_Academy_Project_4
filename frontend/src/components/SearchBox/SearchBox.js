import "./searchBox.css"
import React,{useState,useContext,useEffect} from "react";
import { useNavigate} from "react-router-dom";
import {TokenContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; 
import NavBar from "../NavBar/NavBar";
import axios from "axios";


const SearchBox=()=>{
    const {token,setToken}=useContext(TokenContext);
    const {currentUserId,setCurrentUserId}=useContext(TokenContext); 
    const [items,setItems]=useState([]);
    const [isRendered,setIsRendered]=useState(false)

    const navigate = useNavigate();
    let searchUrl="http://localhost:5000/items"

    useEffect(()=>{ //! the items are rendered twice/ the render is going to be invoked on change
        axios.get(searchUrl,{headers:{authorization:token}}).then((result)=>{
            setItems(result.data.items)
            console.log(items)
            setIsRendered(true)
        }).catch((error)=>{
            console.log(error)
        })
        
    },[isRendered])

    
    return <div className="HomePage">
    <NavBar/>
    <h1>this is the SearchBox</h1>
    </div>
};

export default SearchBox;