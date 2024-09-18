
import {Link} from 'react-router-dom'
import { UserContext } from '../context/UserContext';
import { getAllUser } from '../utils/api';
import { useContext, useEffect, useState } from 'react';

const User = () => {
    // const user = useContext(UserContext)
    const { user, setUser } = useContext(UserContext);

    const [listUsers, setListUsers] = useState([])
    useEffect(() => {
        getAllUser().then(users => {
            console.log(users)
            setListUsers(users)
        })
    })
    return <div>
        {listUsers.map((user) => {
            return <p>{user.username}</p>
        })}
    </div>
}

export default User;
