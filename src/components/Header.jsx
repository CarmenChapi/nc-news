import { Link } from "react-router-dom";
import MiniUser from "./MiniUser";

import { UserContext } from "../context/UserContext";
import { useContext } from "react";



const Header = () => {
    const { user, setUser } = useContext(UserContext);
  
    return <section>
        { !user && <div className="head" id="head"><h1>{Date().split('G')[0].slice(0,-4)}</h1></div>}
       { user &&
       <div className="head" id="head">
        <Link to="/" className="head">
        <div className="title" ><h1 className="nc-news">NC NEWS</h1></div>
        </Link>
        {/* <h2>{Date().split('G')[0].slice(0,-4)}         </h2> */}
        <MiniUser/> </div>}
        
    </section>

}

export default Header;