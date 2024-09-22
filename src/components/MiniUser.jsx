import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const MiniUser = () => {
  const { user, setUser } = useContext(UserContext);

    return <div>
      {!user && <></>}
      {user && <div className="mini-user">
        <img className="logo" src={user.avatar_url} tab="user logo"/>
        <p className="user-name">{user.username}</p>
        <Link to="/users">
           <button className="nav-button">Log out</button> 
        </Link>
      </div>}
      </div>

};
export default MiniUser;
