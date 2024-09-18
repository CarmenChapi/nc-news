import { Link } from "react-router-dom";
import useContext from "react";
import MiniUser from "./MiniUser";


const Header = () => {

  
    return <div className="Head">
   
        <Link to="/">
        <h1>NC NEWS</h1>
        </Link>
        
    </div>

}

export default Header;