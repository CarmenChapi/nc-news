import { useEffect, useState } from "react";
import { getAllTopics } from "../utils/api";
import { Link} from "react-router-dom";
import ErrorPage from "./ErrorPage"
import { UserContext } from "../context/UserContext";
import { useContext } from "react";


const TopicsNavBar = () => {
    const { user, setUser } = useContext(UserContext);

    const [listTopics, setListTopics] = useState([])
    const [error, setError] =useState(null)

    useEffect(() => {

    
        getAllTopics().then(topics => {
            setListTopics(topics)
        })
        .catch(err => {
            console.log("Error getting topics--->", err)
            setError(err)
        })
    },[])
   
    return <section>
         {error && <ErrorPage errorMsg={error.message}/>}
         {!error && <div className="topic-nav-bar">
        {
            listTopics.map((topic, index) => {
              
               return  <Link key={index} className="nav-links" to={`/articles?topic=${topic.slug}`}>
               <button className="nav-button">{topic.slug[0].toUpperCase()+ topic.slug.slice(1)}</button>
             </Link>
            })
        }
      { user &&
        <Link key={listTopics.length+1} className="nav-links" to={`/articles?author=${user.username}`}>
               <button className="nav-button">My articles</button>
             </Link> }
    </div>}
    </section>
}

export default TopicsNavBar; 