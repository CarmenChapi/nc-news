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
    
    return <section className="list-user-card" onClick={handlePickUser}>
        <img className="user-avatar" src={userL.avatar_url} alt={`${userL.username} avatar`}/>
        <h3>{userL.username}</h3>
        <h3>{userL.name}</h3>
        </section>
}

export default UserCard;