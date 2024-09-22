
import { UserContext } from '../context/UserContext';
import { getAllUsers } from '../utils/api';
import { useContext, useEffect, useState } from 'react';
import UserCard from './UserCard';

import { useNavigate } from "react-router-dom";

const Users = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
  
   
    const [listUsers, setListUsers] = useState([])
    const [userForm, setUserForm] = useState("")
    const [isLogIn, setLogIn] = useState(false)
    const [isEmptyInput, setIsEmptyInput] = useState(false)
    const [isIncorrectUser, setIsIncorrectUser] = useState(false)
    setUser(null);

    if(isLogIn){
        navigate("/");
    }

    function handleInputOnChange(e){
        setUserForm(e.target.value);
    }
    function handleSubmit(e){
        e.preventDefault()
    if(userForm.length>0){
        setIsEmptyInput(false)
       listUsers.forEach(userL => {
        if(userL.username === userForm){
            setLogIn(true)
            userL.show=true;
            setUser(userL)
        }
  
       })
       if(!isLogIn)
        setIsIncorrectUser(true)
    }else{
        setIsEmptyInput(true)
    }
    }

    useEffect(() => {
        getAllUsers().then(users => {
            setListUsers(users)
        })
        .catch((err)=>{console.log("Error getting users->",err)})
    },[])
    return <div className="user">
        <form className='form-user'>
        <input value={userForm} type="text" onChange={(e)=>handleInputOnChange(e)} placeholder="Insert a valid username" className="input-user"/><button onClick={handleSubmit}>Log In</button>
        {isEmptyInput ? <p className="error-input"> It is empty</p> : <></>}
        {isIncorrectUser ? <p className="error-input"> User incorrect. Try again</p> : <></>}
        </form>
        <br/>
        <div>
        <h3>Pick one user to log in</h3>
        <ul key="list-users" className="list-users"> 

            {listUsers.map((userL,index) => {
                return <li key={index}><UserCard userL={userL} /> </li>
            })}
        </ul>
        </div>
        
    </div>
}

export default Users;
