import { Link } from "react-router-dom";
import MiniUser from "./MiniUser";
const Header = () => {

  
    return <div className="head" id="head">
   
        <Link to="/" className="head">
        <h1 className="title">NC NEWS</h1>
        </Link>
        <h4>{Date().split('G')[0]}</h4>
        <MiniUser/> 
        
    </div>

}

export default Header;