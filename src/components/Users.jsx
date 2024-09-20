
import { UserContext } from '../context/UserContext';
import { getAllUser } from '../utils/api';
import { useContext, useEffect, useState } from 'react';

import { useNavigate } from "react-router-dom";

const Users = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
   
    const [listUsers, setListUsers] = useState([])
    const [userForm, setUserForm] = useState("")
    const [isLogIn, setLogIn] = useState(false)
    if(isLogIn){
        navigate("/");
    }

    function handleInputOnChange(e){
        setUserForm(e.target.value);
    }
    function handleSubmit(e){
        e.preventDefault()
        console.log(userForm)
        console.log("Log in")
       // setUserForm("")

       listUsers.forEach(userL => {
        if(userL.username === userForm){
            setLogIn(true)
            userL.show=true;
            setUser(userL)
        }
  
       })
    }

    useEffect(() => {
        getAllUser().then(users => {
            setListUsers(users)
        })
    },[])
    return <div>
        <input value={userForm} type="text" onChange={(e)=>handleInputOnChange(e)} placeholder="Insert username" className="input-user"/><button onClick={handleSubmit}>Log In</button>
    </div>
}

export default Users;
