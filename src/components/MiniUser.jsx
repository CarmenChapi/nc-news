import { UserContext } from "../context/UserContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

const MiniUser = () => {
  const { user, setUser } = useContext(UserContext);
  const [isLogIn, setLogIn] = useState(true);
  if(user.length){
    setLogIn(true)
  }

  function handleLogOut(event) {
    setLogIn(false);
    setUser("");
  }

    return (
      <div>
        <p>{user.username}</p>
        <Link to="/users">
          {isLogIn ? <button onClick={handleLogOut}>Log out</button> : <></>}
        </Link>
      </div>
    );

};
export default MiniUser;
