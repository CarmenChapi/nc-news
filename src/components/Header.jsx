import { Link } from "react-router-dom";
import MiniUser from "./MiniUser";

import { UserContext } from "../context/UserContext";
import { useContext } from "react";



const Header = () => {
    const { user, setUser } = useContext(UserContext);
 
  
    return <section>
        { !user && <div className="head" id="head"><h1>{Date().split('G')[0]}</h1></div>}
       { user &&
       <div className="head" id="head">
        <Link to="/" className="head">
        <h1 className="title">NC NEWS</h1>
        </Link>
        <h2>{Date().split('G')[0]}         </h2>
        <MiniUser/> </div>}
        
    </section>

}

export default Header;