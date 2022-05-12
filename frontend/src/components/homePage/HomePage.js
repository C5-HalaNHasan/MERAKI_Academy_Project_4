import "./homepage.css"
import { useNavigate } from "react-router-dom";

const HomePage=()=>{
    const navigate = useNavigate();
    return <div className="HomePage">
    <h1>this is the main page</h1>
    </div>
};

export default HomePage;