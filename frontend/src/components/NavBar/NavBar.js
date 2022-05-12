import "./homepage.css"
import { useNavigate } from "react-router-dom";
import {TokenContext,CurrentUserIdContext} from "D:/MA/Projects/project_4/MERAKI_Academy_Project_4/frontend/src/App.js"; 

const NavBar=()=>{
    //some navbar components/elements are going to be shown only for registered users //!not used yet
    const {token,setToken}=useContext(TokenContext); 
    const {currentUserId,setCurrentUserId}=useContext(CurrentUserIdContext); 

    const navigate = useNavigate();
    //logout function that is going to delete the token & userId and remove some components/elements from the homePage & the NavBar
    const LogOut=()=>{
        // set token to null
        setToken(null);
        setCurrentUserId(null);
        //remove token from the local storage
        localStorage.removeItem("token");
        //to redirect the user to the login page
        const navigate=useNavigate()
        {navigate("/login")}
    }
    return <div className="NavBar">
    <h1>Logo</h1>
    <SearchBox />
    <WishList/>
    <CartItems />
    <UserBoard />
    {logout}
    </div>
};

export default  NavBar;