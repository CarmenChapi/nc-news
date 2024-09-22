import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from "../context/UserContext";

const UserCard = ({userL}) => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    function handlePickUser(){
        setUser(userL);
        navigate("/")
    }
    
    return <div className="list-user-card" onClick={handlePickUser}>
        <img className="logo" src={userL.avatar_url} tab="user avatar"/>
        <h4>{userL.name}</h4>
        </div>
}

export default UserCard;