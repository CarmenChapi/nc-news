import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const MiniUser = () => {
  const { user, setUser } = useContext(UserContext);

  function handleSubmit(){
    setUser(null)
  }
 
    return <section>
      {!user && <></>}
      {user && <div className="mini-user">
        <img className="logo mini-photo" src={user.avatar_url} alt={user.username + "avatar"}/>
        <p className="user-name">{user.username}</p>
        <Link to="/users">
           <button onClick={handleSubmit }className="login-button">Log out</button> 
        </Link>
      </div>}
      </section>

};
export default MiniUser;
